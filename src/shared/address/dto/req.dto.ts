/*
 * @Author: Lee
 * @Date: 2023-02-27 14:10:29
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:25:21
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class AreaDto {
  @ApiProperty({ description: '详细地址' })
  @IsNotEmpty({ message: '详细地址不能为空' })
  address: string;

  @ApiProperty({ description: '地标名' })
  @IsNotEmpty({ message: '地标名不能为空' })
  name: string;

  @ApiProperty({ description: '经度' })
  @IsNotEmpty({ message: '经度不能为空' })
  latitude: string;

  @ApiProperty({ description: '纬度' })
  @IsNotEmpty({ message: '纬度不能为空' })
  longitude: string;
}

export class AddressAddOrUpdateDto {
  @ApiProperty({ description: '地址ID', required: false })
  id?: string;

  @ApiProperty({ description: '联系人' })
  @IsNotEmpty({ message: '联系人姓名不能为空' })
  name: string;

  @ApiProperty({ description: '联系电话' })
  @IsMobilePhone(
    'zh-CN',
    { strictMode: false },
    { message: '手机号码格式不正确' },
  )
  @IsNotEmpty({ message: '联系电话不能为空' })
  phone: string;

  // -- 校验对象类型
  @ApiProperty({ description: '所在地区' })
  @ValidateNested()
  @Type(() => AreaDto)
  @IsObject()
  area: AreaDto;

  @ApiProperty({ description: '门牌号' })
  @IsNotEmpty({ message: '门牌号不能为空' })
  doorplate: string;

  @ApiProperty({ description: '是否默认', default: 0 })
  isDefault: number;
}
