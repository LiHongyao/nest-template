/*
 * @Author: Lee
 * @Date: 2023-02-27 14:03:08
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 14:28:42
 * @Description:
 */

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'address', autoIndex: true })
export class Address {
  // -- 地址ID/自动生成

  // -- 用户ID
  @Prop({ type: String, require: true, index: true })
  userId: string;

  // -- 联系人
  @Prop({ type: String, require: true })
  name: string;

  // -- 联系电话
  @Prop({ type: String, require: true })
  phone: string;

  // -- 所在地区
  @Prop({ type: String, require: true })
  area: string;

  // -- 门牌号
  @Prop({ type: String, require: true })
  doorplate: string;

  // -- 是否默认
  @Prop({ type: String, require: true })
  isDefault: number;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
