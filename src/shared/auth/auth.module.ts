/*
 * @Author: Lee
 * @Date: 2023-02-19 17:08:14
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-19 22:22:27
 * @Description:
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // → 引入http模块
    HttpModule,
    // → 引入jwt模块
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy /** 引入jwt策略 */],
})
export class AuthModule {}
