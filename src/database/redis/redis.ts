/*
 * @Author: Lee
 * @Date: 2023-02-23 12:53:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-23 18:44:28
 * @Description:
 */

// → https://blog.csdn.net/qq_43272311/article/details/128812721
import Redis from 'ioredis';
import { REDIS_CONFIGS, REDIS_CONFIGS_CLUSTER } from './redis.config';

export class RedisInstance {
  static async initRedis(connectType?: string) {
    if (connectType && connectType === 'cluster') {
      // → Redis 集群连接
      const cluster = new Redis.Cluster(REDIS_CONFIGS_CLUSTER);
      cluster.on('error', (err) => console.log('Redis cluster Error', err));
      cluster.on('connect', () => console.log('Redis 集群连接成功'));
      return cluster;
    } else {
      // → Redis 集群连接
      const redis = new Redis(REDIS_CONFIGS);
      redis.on('error', (err) => console.log('Redis cluster Error', err));
      redis.on('connect', () => console.log('Redis 连接成功'));
      return redis;
    }
  }
}
