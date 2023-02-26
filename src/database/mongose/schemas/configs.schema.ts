/*
 * @Author: Lee
 * @Date: 2023-02-24 12:27:42
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-24 13:13:02
 * @Description:
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';

@Schema({ versionKey: false, collection: 'configs', autoIndex: true })
export class Configs extends Document {
  
  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: String, required: true })
  value: string;

  @Prop({ type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  lastModified: String;
}

export type ConfigsDocument = Configs & Document;
export const ConfigsSchema = SchemaFactory.createForClass(Configs);
