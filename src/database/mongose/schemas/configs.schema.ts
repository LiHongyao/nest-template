/*
 * @Author: Lee
 * @Date: 2023-02-24 12:27:42
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:16:54
 * @Description:
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'configs', autoIndex: true })
export class Configs extends Document {
  // -- 存储key
  @Prop({ unique: true })
  key: string;

  // -- 存储值
  @Prop({ type: Object })
  value: any;

  // -- 更新时间
  @Prop()
  lastModified: String;
}

export type ConfigsDocument = Configs & Document;
export const ConfigsSchema = SchemaFactory.createForClass(Configs);
