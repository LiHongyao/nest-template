/*
 * @Author: Lee
 * @Date: 2023-02-27 10:13:51
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 10:36:14
 * @Description:
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ListPageDto } from 'src/common/dto/req.dto';

export class FeedbackAddDto {
  @ApiProperty({ description: '反馈内容' })
  @IsNotEmpty({ message: '请填写反馈内容' })
  content: string;
}

export class FeedbackListDto extends ListPageDto {}
