/*
 * @Author: Lee
 * @Date: 2023-01-10 15:59:43
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 09:18:53
 * @Description:
 */


import { Redis } from 'ioredis';
import { RedisModuleOptions } from './redis.interfaces';
import { REDIS_MODULE_CONNECTION, REDIS_MODULE_CONNECTION_TOKEN, REDIS_MODULE_OPTIONS_TOKEN } from './redis.constants';

export function getRedisOptionsToken(connection?: string): string {
  return `${connection || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_OPTIONS_TOKEN}`;
}

export function getRedisConnectionToken(connection?: string): string {
  return `${connection || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_CONNECTION_TOKEN}`;
}

export function createRedisConnection(options: RedisModuleOptions) {
  const { config } = options;
  if (config.url) {
    return new Redis(config.url, config);
  } else {
    return new Redis(config);
  }
}
