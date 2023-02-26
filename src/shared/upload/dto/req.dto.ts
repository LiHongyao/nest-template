/*
 * @Author: Lee
 * @Date: 2023-02-19 22:37:25
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-19 22:37:37
 * @Description: 
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadForUpyunDto {
  @ApiProperty({ description: '存储路径', example: '/xxx/xxx.jpg' })
  @IsNotEmpty({ message: '请填写文件路径' })
  key: string;
}

export class UploadForOSSDto {}
