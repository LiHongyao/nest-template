/*
 * @Author: Lee
 * @Date: 2022-05-26 19:41:16
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 21:31:48
 * @Description:
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ versionKey: false, collection: 'users' })
export class User extends Document {
  @Prop({ unique: true, required: true })
  phone: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
