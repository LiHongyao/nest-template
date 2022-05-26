/*
 * @Author: Lee
 * @Date: 2022-05-24 23:11:58
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 21:55:34
 * @Description:
 */

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '账号不能为空' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
