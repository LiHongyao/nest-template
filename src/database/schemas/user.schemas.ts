/*
 * @Author: Lee
 * @Date: 2022-05-24 17:44:11
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 19:08:07
 * @Description:
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// -- @Schema 装饰器标记一个类作为Schema 定义
// -- @Prop 装饰器在文档中定义了一个属性
@Schema({ versionKey: false, collection: 'users' })
export class User extends Document {
  @Prop({ unique: true, required: true })
  phone: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  job: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
