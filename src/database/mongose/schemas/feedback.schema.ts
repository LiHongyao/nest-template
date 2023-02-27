/*
 * @Author: Lee
 * @Date: 2023-02-27 10:14:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:28:18
 * @Description:
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'feedbacks', autoIndex: true })
export class Feedback {
  // -- 反馈内容
  @Prop({ type: String, required: true })
  content: string;

  // -- 用户ID
  @Prop({ type: String, required: true })
  userId: string;

  // -- 用户昵称
  @Prop({ type: String, default: '' })
  nickname: string;

  // -- 联系方式
  @Prop({ type: String, default: '' })
  phone: string;

  // -- 创建时间
  @Prop({ type: String, default: '' })
  createDate: string;
}

export type FeedbackDocument = Feedback & Document;
export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
