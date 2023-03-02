/*
 * @Author: Lee
 * @Date: 2023-02-21 16:18:03
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:30:09
 * @Description:
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';

@Schema({ versionKey: false, collection: 'banners', autoIndex: true })
export class Banner {
  // -- 轮播广告照片
  @Prop()
  bannerPic: string;

  // -- 跳转链接
  @Prop()
  jumpUrl: string;

  // -- 展示开始时间
  @Prop()
  start: string;

  // -- 展示结束结束
  @Prop()
  end: string;

  // -- 状态：启用/禁用
  @Prop({ default: 0 })
  state: number;

  // -- 权重
  @Prop({ default: 0 })
  weight: number;

  // -- 创建时间
  @Prop()
  createDate: string;
}

export type BannerDocument = Banner & Document;
export const BannerSchema = SchemaFactory.createForClass(Banner);
