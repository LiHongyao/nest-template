/*
 * @Author: Lee
 * @Date: 2022-06-24 17:33:27
 * @LastEditors: Lee
 * @LastEditTime: 2022-06-24 17:35:57
 * @Description:
 */
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
