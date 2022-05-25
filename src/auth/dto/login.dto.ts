/*
 * @Author: Lee
 * @Date: 2022-05-24 23:11:58
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 23:16:15
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsString()
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @ApiProperty({ description: '密码', example: '123' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
