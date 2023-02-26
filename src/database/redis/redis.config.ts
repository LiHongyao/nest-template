/*
 * @Author: Lee
 * @Date: 2023-02-23 13:16:03
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-25 23:48:15
 * @Description:
 */

import { RedisOptions } from 'ioredis';

// 👉 redis单节点配置
export const REDIS_CONFIGS: RedisOptions = {
  port: 6379,
  host: '0.0.0.0',
  password: '',
  db: 0,
};

// 👉 redis集群配置
export const REDIS_CONFIGS_CLUSTER = [
  { port: 9736, host: 'xxx.xx.xx.xx' },
  { port: 9736, host: 'xxx.xx.xx.xx' },
];
