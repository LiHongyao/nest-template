/*
 * @Author: Lee
 * @Date: 2023-02-21 16:18:03
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-24 16:29:36
 * @Description:
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';

@Schema({ versionKey: false, collection: 'banners', autoIndex: true })
export class Banner {
  @Prop({ type: String, required: true })
  bannerPic: string;

  @Prop({ type: String, required: true })
  jumpUrl: string;

  @Prop({ type: String, required: true })
  start: string;

  @Prop({ type: String, required: true })
  end: string;

  @Prop({ type: Number, default: 0 })
  state: number;

  @Prop({ type: Number, default: 0 })
  weight: number;

  @Prop({ type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  createDate: string;
}

export type BannerDocument = Banner & Document;
export const BannerSchema = SchemaFactory.createForClass(Banner);
