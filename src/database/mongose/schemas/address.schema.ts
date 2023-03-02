/*
 * @Author: Lee
 * @Date: 2023-02-27 14:03:08
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:25:00
 * @Description:
 */

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// -- 微信地图选择返回的信息结构
@Schema({ _id: false })
export class Area {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;
}

@Schema({ versionKey: false, collection: 'address', autoIndex: true })
export class Address {
  // -- 地址ID/自动生成

  // -- 用户ID
  @Prop()
  userId: string;
  // -- 联系人
  @Prop()
  name: string;
  // -- 联系电话
  @Prop()
  phone: string;

  // -- 所在地区
  @Prop()
  area: Area;

  // -- 门牌号
  @Prop()
  doorplate: string;

  // -- 是否默认
  @Prop({ default: 0 })
  isDefault: number;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
