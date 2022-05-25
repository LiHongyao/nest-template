/*
 * @Author: Lee
 * @Date: 2022-05-24 22:28:27
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 22:34:40
 * @Description:
 */
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

const logger = new Logger('upload.service');

@Injectable()
export class UploadService {
  /**
   * 获取上传签名：又拍云
   * http://v0.api.upyun.com/ + 空间名
   * @param key 存储路径/前端发送
   * @returns
   */
  async getSignForUpyun(key: string) {
    const bucketname = 'codings'; /** 服务名 */
    const username = 'lee'; /** 操作员账号  */
    const password = 'ooI91WBcm33wtk3FC1zzeQE5suluylw6'; /** 操作员密码 */
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
}
