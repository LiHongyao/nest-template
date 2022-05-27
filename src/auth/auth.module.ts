/*
 * @Author: Lee
 * @Date: 2022-05-24 19:13:10
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 17:44:09
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/shared/user/user.service';
import { JWT_CONSTANT } from './constants/jwt.constant';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // -- 引入jwt模块
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
