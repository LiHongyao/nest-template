/*
 * @Author: Lee
 * @Date: 2022-05-24 19:13:10
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 23:24:59
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from 'src/common/constants/common.constants';
import { UserService } from 'src/shared/user/user.service';

@Module({
  imports: [
    // -- 引入jwt模块
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
