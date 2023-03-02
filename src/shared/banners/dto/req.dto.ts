/*
 * @Author: Lee
 * @Date: 2023-02-21 15:48:13
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:30:53
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ListPageDto } from 'src/common/dto/req.dto';

export class BannerAddOrUpdateDto {
  @ApiProperty({ description: 'ID' })
  id?: string;

  @ApiProperty({ description: '图片地址' })
  @IsNotEmpty({ message: '图片地址不能为空' })
  bannerPic: string;

  @ApiProperty({ description: '跳转链接' })
  @IsNotEmpty({ message: '跳转链接不能为空' })
  jumpUrl: string;

  @ApiProperty({ description: '开始时间' })
  @IsNotEmpty({ message: '开始时间不能为空' })
  start: string;

  @ApiProperty({ description: '结束时间' })
  @IsNotEmpty({ message: '结束时间不能为空' })
  end: string;

  @ApiProperty({ description: '权重', default: 0, required: false })
  weight?: number;
}

/**
 * 查询列表
 */
export class BannerListDto extends ListPageDto {
  @ApiProperty({ description: '启用状态，0-已禁用，1-已启用' })
  state?: number;
}
