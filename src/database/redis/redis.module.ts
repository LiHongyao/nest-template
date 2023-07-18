/*
 * @Author: Lee
 * @Date: 2023-03-23 18:51:54
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 09:16:56
 * @Description:
 */

import { DynamicModule, Module } from '@nestjs/common';
import { RedisCoreModule } from './redis.core-module';
import {
  RedisModuleAsyncOptions,
  RedisModuleOptions,
} from './redis.interfaces';

/**
 * 构造 Redis 动态模块，调用者注入
 */
@Module({})
export class RedisModule {
  /**
   * 同步注册Redis模块
   * @param options
   * @param connection
   * @returns
   */
  public static forRoot(
    options: RedisModuleOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options, connection)], // -- 注册核心模块
      exports: [RedisCoreModule], // -- 导出核心模块
    };
  }

  /**
   * 异步注册Redis模块
   * @param options
   * @param connection
   * @returns
   */
  public static forRootAsync(
    options: RedisModuleAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options, connection)], // -- 注册核心模块
      exports: [RedisCoreModule], // -- 导出核心模块
    };
  }
}
