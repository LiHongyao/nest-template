/*
 * @Author: Lee
 * @Date: 2023-02-23 21:41:50
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 18:53:42
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class SetHotlineDto {
  @ApiProperty({ description: '咨询电话', default: '' })
  @IsNotEmpty()
  @IsMobilePhone(
    'zh-CN',
    { strictMode: false },
    { message: '手机号码格式不正确' },
  )
  phone: string;
}
