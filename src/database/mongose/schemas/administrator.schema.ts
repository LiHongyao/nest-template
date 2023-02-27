/*
 * @Author: Lee
 * @Date: 2023-02-21 14:05:52
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 16:08:38
 * @Description:
 */

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'administrators', autoIndex: true })
export class Administrator {
  // -- 用户名
  @Prop({ type: String, unique: true, required: true, index: true })
  username: string;

  // -- 密码
  @Prop({ type: String, required: true })
  password: string;

  // -- 昵称
  @Prop({ type: String, required: true })
  nickname: string;

  // -- 头像
  @Prop({ type: String, required: true })
  avatar: string;

  // -- 解密盐
  @Prop({ type: String, required: true })
  salt: string;

  // -- 角色ID
  @Prop({ type: String, required: true })
  roleId: string;

  // -- 创建者
  @Prop({ type: String, required: false, default: '超管' })
  createBy: string;

  // -- 创建时间
  @Prop({ type: String, required: false, default: '' })
  createDate: string;

  // -- 最后登录时间
  @Prop({ type: String, required: false, default: '' })
  lastLoginTime: string;

  // -- 用户状态
  @Prop({ type: Number, required: false, default: 1 })
  state: number;
}

export type AdministratorDocument = Administrator & Document;
export const AdministratorSchema = SchemaFactory.createForClass(Administrator);
