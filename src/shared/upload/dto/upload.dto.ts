/*
 * @Author: Lee
 * @Date: 2022-05-24 22:29:29
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 22:29:40
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadDto {
  @ApiProperty({ description: '存储路径', example: '/xxx/xxx.jpg' })
  @IsNotEmpty({ message: '请填写文件路径' })
  key: string;
}
