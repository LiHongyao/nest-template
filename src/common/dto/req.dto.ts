/*
 * @Author: Lee
 * @Date: 2023-02-21 16:35:31
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-24 17:28:34
 * @Description:
 */

// 👉  本文件主要统一定义请求DTOs
import { ApiProperty } from '@nestjs/swagger';

export class ListPageDto {
  @ApiProperty({ description: '当前页码', default: 1, required: false })
  current?: number;

  @ApiProperty({ description: '每页条数', default: 10, required: false })
  pageSize?: number;
}
