/*
 * @Author: Lee
 * @Date: 2023-02-26 11:58:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 21:05:49
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AccessAddOrUpdateDto {
  @ApiProperty({
    description: '权限ID，编辑权限时必传',
    required: false,
    default: '',
  })
  authId?: string;

  @ApiProperty({
    description: '父级ID，创建权限时必传',
    required: false,
    default: '',
  })
  parentId?: string;

  @ApiProperty({ description: '权限名称', default: '' })
  @IsNotEmpty({ message: '请填写权限名称' })
  name: string;

  @ApiProperty({ description: '权限代码', default: '' })
  @IsNotEmpty({ message: '请填写权限代码' })
  code: string;
}

export class RoleAddOrUpdateDto {
  @ApiProperty({ description: '角色id', required: false })
  id?: string;

  @ApiProperty({ description: '角色名称' })
  roleName: string;

  @ApiProperty({ description: '角色权限' })
  authIds: Array<String>;
}
