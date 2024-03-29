/*
 * @Author: Lee
 * @Date: 2023-02-26 11:39:43
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 16:37:36
 * @Description:
 */
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'access', autoIndex: true })
export class Access {
  // -- 权限ID/自动生成

  // -- 父类ID
  @Prop({ type: Types.ObjectId })
  parentId?: string;

  // -- 权限代码
  @Prop({ required: true })
  code: string;

  // -- 权限名称
  @Prop({ required: true })
  name: string;
}

export type AccessDocument = Access & Document;
export const AccessSchema = SchemaFactory.createForClass(Access);
