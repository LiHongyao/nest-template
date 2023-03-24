/*
 * @Author: Lee
 * @Date: 2023-02-26 21:53:46
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:04:28
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdminAddOrUpdateDto {
  @ApiProperty({ description: '用户ID' })
  id?: string;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '登录密码' })
  @IsNotEmpty({ message: '登录密码不能为空' })
  password: string;

  @ApiProperty({ description: '用户昵称' })
  @IsNotEmpty({ message: '用户昵称不能为空' })
  nickName: string;

  @ApiProperty({ description: '用户头像' })
  @IsNotEmpty({ message: '用户头像不能为空' })
  avatar: string;

  @ApiProperty({ description: '用户角色' })
  @IsNotEmpty({ message: '用户角色不能为空' })
  roleId: string;
}

export class ChangePswDto {
  @ApiProperty({ description: '原始密码', default: '' })
  @IsNotEmpty({ message: '原始密码不能为空' })
  oldPassword: string;

  @ApiProperty({ description: '新密码', default: '' })
  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;
}

export class AdminListDto {
  @ApiProperty({ description: '状态 0-已禁用 1-已启用', required: false })
  state?: number;
}
