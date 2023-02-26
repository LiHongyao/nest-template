/*
 * @Author: Lee
 * @Date: 2023-02-19 18:33:24
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-24 16:22:44
 * @Description:
 */

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';

@Schema({ versionKey: false, collection: 'users', autoIndex: false })
export class User {
  @Prop({ type: String, unique: true, required: true, index: true })
  _id: string;

  @Prop({ type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  createDate: string;

  @Prop({ type: String, default: '' })
  nickName: string;

  @Prop({ type: String, default: '' })
  avatarUrl: string;

  @Prop({ type: String, default: '' })
  phone: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
