/*
 * @Author: Lee
 * @Date: 2023-03-23 18:51:54
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-24 11:06:00
 * @Description: 
 */
import { DynamicModule, Module } from '@nestjs/common';
import { RedisCoreModule } from './redis.core-module';
import {
  RedisModuleAsyncOptions,
  RedisModuleOptions,
} from './redis.interfaces';

@Module({})
export class RedisModule {
  public static forRoot(
    options: RedisModuleOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options, connection)],
      exports: [RedisCoreModule],
    };
  }

  public static forRootAsync(
    options: RedisModuleAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options, connection)],
      exports: [RedisCoreModule],
    };
  }
}
