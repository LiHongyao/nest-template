/*
 * @Author: Lee
 * @Date: 2023-02-19 16:41:17
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 22:52:30
 * @Description: 生产环境
 */

// 👉 生产环境
export const config = {
  // → env
  env: 'pro',
  // → third services
  apiHost: '请求三方服务器使用的域名（生产环境）',
  // → mongose
  mongoose: {
    uri: 'mongodb://username:password@127.0.0.1:27017/dbname',
  },
  // → redis
  redis: {
    host: '0.0.0.0',
    port: 6379,
  },
  // → 微信小程序
  mp: {
    appID: 'wx623aef09b8a4599a',
    appsecret: '2cf5c1f1fa5127c999e4368abb82e7b3',
  },
};
