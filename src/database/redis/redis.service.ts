/*
 * @Author: Lee
 * @Date: 2023-02-23 18:46:08
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-23 19:48:49
 * @Description:
 */

import { Injectable, Logger } from '@nestjs/common';
import { Redis, RedisKey } from 'ioredis';
import { REDIS_CONFIGS } from './redis.config';

const logger = new Logger('redis.service');
@Injectable()
export class RedisService {
  private redis: Redis;
  constructor() {
    this.initRedis();
  }

  /**
   * 初始化redis
   * @returns Promise<unknow>
   */
  private initRedis = () => {
    return new Promise((resolve, reject) => {
      this.redis = new Redis(REDIS_CONFIGS);
      this.redis.on('error', (err) => {
        logger.log('Redis cluster Error', err);
        reject(err);
      });
      this.redis.on('connect', () => {
        logger.log('———————— Redis 连接成功 ————————');
        resolve('OK');
      });
    });
  };

  /**
   * 存储Redis
   * @param key
   * @param value
   * @param seconds 过期时间，单位「秒」
   */
  async set(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (!this.redis) {
      await this.initRedis();
    }
    if (!seconds) {
      await this.redis.set(key, value);
    } else {
      await this.redis.set(key, value, 'EX', seconds);
    }
  }

  /**
   * 读取Redis
   * @param key
   * @returns
   */
  async get<T = any>(key: string): Promise<T> {
    if (!this.redis) {
      await this.initRedis();
    }
    const data = await this.redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  async ttl(key: string) {
    if (!this.redis) {
      await this.initRedis();
    }
    return await this.redis.ttl(key);
  }
}
