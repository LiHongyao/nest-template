/*
 * @Author: Lee
 * @Date: 2023-02-22 23:23:50
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 17:19:23
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { ListPageDto } from 'src/common/dto/req.dto';

export class UserListDto extends ListPageDto {
  @ApiProperty({ description: '手机号' })
  phone: string;
}
