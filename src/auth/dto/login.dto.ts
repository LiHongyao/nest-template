/*
 * @Author: Lee
 * @Date: 2022-05-24 23:11:58
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 17:25:26
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '手机号', example: '17398888669' })
  @IsString()
  @IsNotEmpty({ message: '账号不能为空' })
  phone: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
