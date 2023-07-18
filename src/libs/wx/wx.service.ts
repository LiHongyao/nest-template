/*
 * @Author: Lee
 * @Date: 2023-03-24 21:41:22
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 13:24:13
 * @Description:
 */
// --- 参考：https://baaxl9vh.github.io/nest-wechat/#/
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  AccessTokenResult,
  CallbackResource,
  CertificateResult,
  MiniProgramPaymentParameters,
  PhoneNumberResult,
  RefundParameters,
  RefundResult,
  RequireOnlyOne,
  SessionResult,
  Trade,
  TransactionOrder,
  WxModuleOptions,
} from './wx.interface';
import axios from 'axios';
import forge from 'node-forge';
import getRawBody from 'raw-body';
import * as crypto from 'crypto';
import type { Request, Response } from 'express';
import { createNonceStr } from './utils';

const logger = new Logger('wx.service');

@Injectable()
export class WxService {
  constructor(private readonly options: WxModuleOptions) {
    logger.log('微信模块注册成功：', options);
  }

  // =============================== 【小程序】 ===============================
  /**
   * 获取接口调用凭据
   * 获取小程序全局唯一后台接口调用凭据，token有效期为7200s，开发者需要进行妥善保存。
   * @param appID
   * @param appsecret
   * @returns
   */
  async getAccessToken(appID?: string, appsecret?: string) {
    if (!appID || !appsecret) {
      appID = this.options.appID;
      appsecret = this.options.appsecret;
    }
    const uri = 'https://api.weixin.qq.com/cgi-bin/token';
    const resp = await axios.get<AccessTokenResult>(uri, {
      params: {
        grant_type: 'client_credential',
        appid: appID,
        secret: appsecret,
      },
    });
    const { errmsg, errcode, ...result } = resp.data;
    if (errcode) {
      throw new HttpException(errmsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  /**
   * 获取手机号
   * @param {string} accessToken 小程序调用token，第三方可通过使用authorizer_access_token代商家进行调用
   * @param {string} code 手机号获取凭证，小程序端获取
   * @returns
   * @link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html
   * @link https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html
   */
  async getPhoneNumber(code: string, accessToken: string) {
    const uri = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`;
    const resp = await axios.post<PhoneNumberResult>(uri, { code });
    const { errmsg, errcode, ...result } = resp.data;
    if (errcode) {
      throw new HttpException(errmsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  /**
   * 登录
   * @param code 临时登录凭证
   * @returns
   * @link https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
   */
  async code2Session(code: string) {
    const { appID, appsecret } = this.options;
    const uri = `https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;
    const resp = await axios.get<SessionResult>(uri);
    const { errmsg, errcode, ...result } = resp.data;
    if (errcode) {
      throw new HttpException(errmsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  // =============================== 【微信支付】 ===============================
  /**
   * 获取平台证书列表
   * @param mchId
   * @param serialNo
   * @param privateKey
   * @param apiKey
   * @returns
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/apis/wechatpay5_1.shtml
   */
  async getPlatformCertificates(
    mchId: string,
    serialNo: string,
    privateKey: Buffer | string,
    apiKey: string,
  ) {
    const certs: Map<string, string> = new Map();
    const nonceStr = createNonceStr();
    const timestamp = Math.floor(Date.now() / 1000);
    const path = '/v3/certificates';
    const signature = this.generateSignature(
      'GET',
      path,
      timestamp,
      nonceStr,
      privateKey,
    );
    const uri = 'https://api.mch.weixin.qq.com' + path;
    const resp = await axios.get<{ data: CertificateResult[] }>(uri, {
      headers: this.generateHeader(
        mchId,
        nonceStr,
        timestamp,
        serialNo,
        signature,
      ),
    });
    if (resp && resp.status === 200 && resp.data) {
      const certificates = resp.data.data;
      for (const cert of certificates) {
        const publicKey = this.decryptCipherText(
          apiKey,
          cert.encrypt_certificate.ciphertext,
          cert.encrypt_certificate.associated_data,
          cert.encrypt_certificate.nonce,
        ) as string;
        const sn = this.getCertificateSn(publicKey);
        certs.set(sn, publicKey);
      }
    }
    return certs;
  }

  /**
   * JSAPI下单
   * @param order 下单信息
   * @param serialNo 私钥序列号
   * @param privateKey 私钥
   * @returns 预支付交易会话标识，用于后续接口调用中使用，该值有效期为2小时
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_5_1.shtml
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_0.shtml
   */
  public async jsapi(
    order: TransactionOrder,
    serialNo: string,
    privateKey: Buffer | string,
  ) {
    // 1. 构造数据
    const nonceStr = createNonceStr();
    const timestamp = Math.floor(Date.now() / 1000);
    const path = '/v3/pay/transactions/jsapi';
    // 2. 生成签名
    const signature = this.generateSignature(
      'POST',
      path,
      timestamp,
      nonceStr,
      privateKey,
      order,
    );
    // 3. 构造请求头
    const headers = this.generateHeader(
      order.mchid,
      nonceStr,
      timestamp,
      serialNo,
      signature,
    );
    // 4. 发送请求
    const uri = 'https://api.mch.weixin.qq.com' + path;
    return axios.post<{ prepay_id: string }>(uri, order, { headers });
  }

  /**
   * 构造小程序调起支付参数
   * @param appId  小程序APPID
   * @param prepayId  JSAPI下单生成的预支付ID
   * @param privateKey  微信支付私钥
   * @returns MiniProgramPaymentParameters
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_5_4.shtml
   */
  public buildMiniProgramPayment(
    appId: string,
    prepayId: string,
    privateKey: Buffer | string,
  ): MiniProgramPaymentParameters {
    // 1. 构造数据
    const nonceStr = createNonceStr();
    const timestamp = Math.floor(Date.now() / 1000);
    const message = `${appId}\n${timestamp}\n${nonceStr}\nprepay_id=${prepayId}\n`;
    // 2. 生成签名
    const paySign = crypto
      .createSign('sha256WithRSAEncryption')
      .update(message)
      .sign(privateKey, 'base64');
    // 3. 响应数据
    return {
      timeStamp: timestamp.toString(),
      nonceStr,
      package: `prepay_id=${prepayId}`,
      signType: 'RSA',
      paySign,
    };
  }

  /**
   * 支付通知处理程序
   * @param certs 微信支付平台证书
   * @param apiKey
   * @param req
   * @param res
   * @returns
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_5_5.shtml
   */
  async paidCallback(
    certs: Map<string, string>,
    apiKey: string,
    req: Request,
    res: Response,
  ): Promise<Trade> {
    const signature =
      req.headers['Wechatpay-Signature'] ||
      req.headers['Wechatpay-Signature'.toLowerCase()];
    const platformSerial =
      req.headers['Wechatpay-Serial'] ||
      req.headers['Wechatpay-Serial'.toLowerCase()];
    const timestamp =
      req.headers['Wechatpay-Timestamp'] ||
      req.headers['Wechatpay-Timestamp'.toLowerCase()];
    const nonce =
      req.headers['Wechatpay-Nonce'] ||
      req.headers['Wechatpay-Nonce'.toLowerCase()];
    let rawBody;
    try {
      rawBody = await getRawBody(req);
    } catch (error) {
      const message = (error as Error).message as string;
      logger.debug(message);
      if (message === 'stream is not readable') {
        rawBody = req.body;
      }
    }
    logger.debug(`Wechatpay-Signature = ${signature}`);
    logger.debug(`Wechatpay-Serial = ${platformSerial}`);
    logger.debug(`Wechatpay-Timestamp = ${timestamp}`);
    logger.debug(`Wechatpay-Nonce = ${nonce}`);
    logger.debug(
      `Body = ${
        typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody)
      }`,
    );
    let verified = false;
    const responseData = { code: 'FAIL', message: '' };
    let result: Trade = {} as Trade;

    const publicKey = certs.get(platformSerial as string);

    if (publicKey) {
      verified = this.verifySignature(
        publicKey,
        timestamp as string,
        nonce as string,
        rawBody,
        signature as string,
      );
      if (verified) {
        const resource: CallbackResource = JSON.parse(
          JSON.stringify(rawBody),
        ).resource;
        result = this.decryptCipherText<Trade>(
          apiKey,
          resource.ciphertext,
          resource.associated_data,
          resource.nonce,
        );
      } else {
        responseData.message = 'VERIFY SIGNATURE FAIL';
      }
    } else {
      // 没有平台证书
      responseData.message = 'PLATFORM CERTIFICATES NOT FOUND';
    }

    if (verified && res && typeof res.send === 'function') {
      res.status(200).send();
    } else {
      res.status(401).json(responseData);
    }
    return result;
  }

  /**
   * 申请退款
   * @param refund
   * @param mchId
   * @param serialNo
   * @param privateKey
   * @returns
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_5_9.shtml
   */
  async refund(
    refund: RequireOnlyOne<RefundParameters, 'transaction_id' | 'out_trade_no'>,
    mchId: string,
    serialNo: string,
    privateKey: Buffer | string,
  ) {
    const nonceStr = createNonceStr();
    const timestamp = Math.floor(Date.now() / 1000);
    const path = '/v3/refund/domestic/refunds';
    const signature = this.generateSignature(
      'POST',
      path,
      timestamp,
      nonceStr,
      privateKey,
      refund,
    );
    const uri = 'https://api.mch.weixin.qq.com' + path;
    return axios.post<RefundResult>(uri, refund, {
      headers: this.generateHeader(
        mchId,
        nonceStr,
        timestamp,
        serialNo,
        signature,
      ),
    });
  }

  /**
   * 构造签名串
   * @param method 请求方法
   * @param url 请求地址
   * @param timestamp 请求时间戳
   * @param nonceStr 请求随机串
   * @param privateKey 私钥
   * @param body 请求报文主体
   * @returns
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_0.shtml#part-1
   */
  private generateSignature(
    method: 'GET' | 'POST',
    url: string,
    timestamp: number,
    nonceStr: string,
    privateKey: Buffer | string,
    body?: object,
  ): string {
    // -- GET
    let message = `${method}\n${url}\n${timestamp}\n${nonceStr}\n\n`;
    // -- POST
    if (method === 'POST') {
      if (!body) {
        body = {};
      }
      message = `${method}\n${url}\n${timestamp}\n${nonceStr}\n${
        typeof body === 'string' ? body : JSON.stringify(body)
      }\n`;
    }
    return crypto
      .createSign('sha256WithRSAEncryption')
      .update(message)
      .sign(privateKey, 'base64');
  }

  /**
   * 构建请求签名头
   * 格式 → Authorization: 认证类型 签名信息
   * @param mchId 商户号
   * @param nonceStr 请求随机串
   * @param timestamp 时间戳
   * @param serialNo 商户API证书序列号
   * @param signature 签名值
   * @returns
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_0.shtml#part-3
   */
  private generateHeader(
    mchId: string,
    nonceStr: string,
    timestamp: number,
    serialNo: string,
    signature: string,
  ) {
    return {
      Authorization: `WECHATPAY2-SHA256-RSA2048 mchid="${mchId}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${serialNo}"`,
    };
  }

  /**
   * 报文解密
   * @param apiKey
   * @param cipher
   * @param associatedData
   * @param nonce
   * @returns
   * @link https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay4_2.shtml
   */
  private decryptCipherText<T>(
    apiKey: string,
    cipher: string,
    associatedData: string,
    nonce: string,
  ): T {
    // algorithm: AEAD_AES_256_GCM
    const buff = Buffer.from(cipher, 'base64');
    const authTag = buff.subarray(buff.length - 16);
    const data = buff.subarray(0, buff.length - 16);
    const decipher = crypto.createDecipheriv('aes-256-gcm', apiKey, nonce);
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from(associatedData));
    const decoded = decipher.update(data, undefined, 'utf8');
    decipher.final();
    try {
      return JSON.parse(decoded);
    } catch (e) {
      return decoded as unknown as T;
    }
  }

  /**
   * 回调或者通知签名验证方法
   * @param publicKey
   * @param timestamp
   * @param nonce
   * @param body
   * @param signature
   * @returns
   */
  private verifySignature(
    publicKey: Buffer | string,
    timestamp: string,
    nonce: string,
    body: string | object,
    signature: string,
  ): boolean {
    const message = `${timestamp}\n${nonce}\n${
      typeof body === 'string' ? body : JSON.stringify(body)
    }\n`;
    const verify = crypto
      .createVerify('RSA-SHA256')
      .update(Buffer.from(message));
    return verify.verify(publicKey, signature, 'base64');
  }

  /**
   * 读取x509证书序列号
   * @param publicKey
   * @returns
   */
  private getCertificateSn(publicKey: Buffer | string): string {
    return forge.pki
      .certificateFromPem(publicKey.toString())
      .serialNumber.toUpperCase();
  }
}
