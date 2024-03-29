/*
 * @Author: Lee
 * @Date: 2023-02-19 17:24:55
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:08:30
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginForMPDto {
  @ApiProperty({ description: '小程序code' })
  @IsNotEmpty({ message: '小程序授权code不能为空' })
  code: string;
}

export class LoginForAdminDto {
  @ApiProperty({ description: '登录账号', default: 'admin' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '登录密码', default: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
