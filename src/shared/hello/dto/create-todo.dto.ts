/*
 * @Author: Lee
 * @Date: 2022-05-24 21:21:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 21:40:18
 * @Description:
 */

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: '不能为空' })
  @MaxLength(20)
  @IsString()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;
}
