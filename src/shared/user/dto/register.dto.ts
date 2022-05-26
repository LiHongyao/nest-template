/*
 * @Author: Lee
 * @Date: 2022-05-26 20:22:23
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 21:40:16
 * @Description:
 */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UserDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
