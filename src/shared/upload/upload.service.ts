/*
 * @Author: Lee
 * @Date: 2023-02-19 22:35:23
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:45:50
 * @Description:
 */
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as OSS from 'ali-oss';
import { OSS_CONFIG } from './upload.constant';

const logger = new Logger('upload.service');

@Injectable()
export class UploadService {
  private client: any;

  constructor() {
    // -- 使用时打开注释
    // this.client = new OSS({
    //   accessKeyId: OSS_CONFIG.accessKeyId,
    //   accessKeySecret: OSS_CONFIG.accessKeySecret,
    //   bucket: OSS_CONFIG.bucket,
    // });
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
    const auth = crypto
      .createHmac('sha1', md5String)
      .update(joinString, 'utf8')
      .digest()
      .toString('base64');
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
    date.setHours(date.getHours() + 1); // 有效期1个小时
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
      data: {
        expire: (Date.parse(date.toString()) / 1000).toString(),
        policy: formData.policy,
        signature: formData.Signature,
        accessKeyId: formData.OSSAccessKeyId,
        host: OSS_CONFIG.bucketHost,
      },
    };
  }
}
