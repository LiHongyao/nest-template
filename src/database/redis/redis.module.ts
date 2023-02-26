/*
 * @Author: Lee
 * @Date: 2023-02-23 18:46:03
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-23 18:57:11
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
