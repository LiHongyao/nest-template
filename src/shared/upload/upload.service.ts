/*
 * @Author: Lee
 * @Date: 2022-05-24 22:28:27
 * @LastEditors: Lee
 * @LastEditTime: 2022-06-21 15:39:22
 * @Description:
 */
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as OSS from 'ali-oss';
import { OSS_CONFIG } from 'src/common/constants/common.constants';

const logger = new Logger('upload.service');

@Injectable()
export class UploadService {
  private client: any;
  constructor() {
    this.client = new OSS({
      accessKeyId: OSS_CONFIG.accessKeyId,
      accessKeySecret: OSS_CONFIG.accessKeySecret,
      bucket: OSS_CONFIG.bucket,
    });
  }

  /**
   * 获取上传签名：又拍云
   * http://v0.api.upyun.com/ + 空间名
   * @param key 存储路径/前端发送
   * @returns
   */
  async getSignForUpyun(key: string) {
    const bucketname = 'xxx'; /** 服务名 */
    const username = 'xxx'; /** 操作员名字  */
    const password = 'xxx'; /** 操作员密码 */
    const method = 'POST';
    const uri = '/' + bucketname; /** 请求路径 */

    // --生成 policy
    const policy = Buffer.from(
      JSON.stringify({
        bucket: bucketname,
        'save-key': key,
        expiration: new Date().getTime() + 5 * 60 * 1000,
      }),
    ).toString('base64');
    // -- 生成 signature
    const joinString = [method, uri, policy].join('&');
    const md5String = crypto.createHash('md5').update(password).digest('hex');
    const auth = crypto.createHmac('sha1', md5String).update(joinString, 'utf8').digest().toString('base64');
    const signature = `UPYUN ${username}:${auth}`;
    logger.log(`signature：${signature}`);
    logger.log(`policy：${policy}`);
    return { code: 0, data: { policy, signature } };
  }

  /**
   * 获取上传签名：阿里云
   * @returns
   */
  async getSignForOSS() {
    // -- policy
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
        // { bucket: client.options.bucket } // 限制可上传的bucket
      ],
    };
    // -- 调用SDK获取签名。
    const formData = await this.client.calculatePostSignature(policy);
    // -- 响应数据
    return {
      code: 0,
      data: {
        policy: formData.policy,
        signature: formData.Signature,
        OSSAccessKeyId: formData.OSSAccessKeyId,
        host: OSS_CONFIG.bucketHost,
      },
    };
  }
}
