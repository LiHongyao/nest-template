/*
 * @Author: Lee
 * @Date: 2023-02-27 10:14:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:35:34
 * @Description:
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'feedbacks', autoIndex: true })
export class Feedback {
  // -- 反馈内容
  @Prop()
  content: string;

  // -- 用户ID
  @Prop()
  userId: string;

  // -- 用户昵称
  @Prop({ default: '' })
  nickname: string;

  // -- 联系方式
  @Prop({ default: '' })
  phone: string;

  // -- 创建时间
  @Prop()
  createDate: string;
}

export type FeedbackDocument = Feedback & Document;
export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
