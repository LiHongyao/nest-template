/*
 * @Author: Lee
 * @Date: 2023-02-22 23:23:50
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-24 13:51:52
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ListPageDto } from 'src/common/dto/req.dto';

export class UserListDto extends ListPageDto {
  @ApiProperty({ description: '手机号' })
  phone?: string;
}

export class UserEditDto {
  @ApiProperty({ description: '用户昵称' })
  @IsNotEmpty({ message: '用户昵称不能为空' })
  nickName: string;

  @ApiProperty({ description: '用户头像' })
  @IsNotEmpty({ message: '用户头像不能为空' })
  avatarUrl: string;
}

export class UserBindPhoneDto {
  @ApiProperty({ description: '授权code' })
  @IsNotEmpty()
  code: string;
}
