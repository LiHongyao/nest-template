/*
 * @Author: Lee
 * @Date: 2023-02-26 11:58:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:00:55
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
    description: '父级ID，创建子权限时必传',
    required: false,
    default: '',
  })
  parentId?: string;

  @ApiProperty({ description: '权限名称', default: '' })
  @IsNotEmpty({ message: '权限名称不能为空' })
  name: string;

  @ApiProperty({ description: '权限代码', default: '' })
  @IsNotEmpty({ message: '权限代码不能为空' })
  code: string;
}

export class RoleAddOrUpdateDto {
  @ApiProperty({ description: '角色id', required: false })
  roleId?: string;

  @ApiProperty({ description: '角色名称' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  roleName: string;

  @ApiProperty({ description: '角色权限' })
  @IsNotEmpty({ message: '角色权限不能为空' })
  authIds: Array<String>;
}
