/*
 * @Author: Lee
 * @Date: 2023-03-23 18:51:54
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 09:12:53
 * @Description:
 */

import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Redis, RedisOptions } from 'ioredis';

/**
 * Redis类型 → RedisType
 * 重命名为RedisType的原因是希望调用者标识Redis类型时从封装库导出，而不是从ioredis中导出
 */
export type RedisType = Redis;

/**
 * 同步注册Redis模块 - 配置项
 */
export interface RedisModuleOptions {
  config: RedisOptions & { url?: string };
}

/**
 * 异步注册Redis模块 - 配置项
 */
export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  // 兼容类名提供者
  useClass?: Type<RedisModuleOptionsFactory>;
  // 兼容别名提供者
  useExisting?: Type<RedisModuleOptionsFactory>;
  // 兼容工厂提供者
  useFactory?: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
}

export interface RedisModuleOptionsFactory {
  createRedisModuleOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
}
