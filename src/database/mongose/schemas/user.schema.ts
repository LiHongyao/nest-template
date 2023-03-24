/*
 * @Author: Lee
 * @Date: 2023-02-19 18:33:24
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-24 13:48:57
 * @Description:
 */

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'users', autoIndex: false })
export class User {
  @Prop({ unique: true, required: true, index: true })
  _id: string;

  @Prop({ default: '' })
  createDate: string;

  @Prop({ default: '' })
  nickName: string;

  @Prop({ default: '' })
  avatarUrl: string;

  @Prop({ default: '' })
  phone: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
