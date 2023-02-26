/*
 * @Author: Lee
 * @Date: 2023-02-26 00:42:08
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 22:20:22
 * @Description:
 */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HashPasswordMiddleware } from 'src/core/middlewares/hash-password.middleware';
import { AdministratorsController } from './administrators.controller';
import { AdministratorsService } from './administrators.service';

@Module({
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
})
export class AdministratorsModule {
  // -- 消费中间件
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashPasswordMiddleware)
      .forRoutes('administrators/addOrUpdate');
  }
}
