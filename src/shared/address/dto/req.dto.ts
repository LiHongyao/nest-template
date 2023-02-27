/*
 * @Author: Lee
 * @Date: 2023-02-27 14:10:29
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 14:24:58
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class AddressAddOrUpdateDto {
  @ApiProperty({ description: '地址ID', default: '', required: false })
  id?: string;

  @ApiProperty({ description: '联系人', default: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '联系电话', default: '' })
  @IsNotEmpty()
  @IsMobilePhone(
    'zh-CN',
    { strictMode: false },
    { message: '手机号码格式不正确' },
  )
  phone: string;

  @ApiProperty({ description: '所在地区', default: '' })
  @IsNotEmpty()
  area: string;

  @ApiProperty({ description: '门牌号', default: '' })
  @IsNotEmpty()
  doorplate: string;

  @ApiProperty({ description: '是否默认', default: 0 })
  @IsNotEmpty()
  isDefault: number;
}
