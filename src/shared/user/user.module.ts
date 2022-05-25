/*
 * @Author: Lee
 * @Date: 2022-05-24 23:09:43
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 23:23:14
 * @Description:
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
