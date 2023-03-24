/*
 * @Author: Lee
 * @Date: 2023-02-19 14:32:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-24 13:43:48
 * @Description:
 */
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HashPasswordMiddleware } from 'src/core/middlewares/hash-password.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    // → 引入http模块
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  // -- 消费中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('users/register-admin');
  }
}
