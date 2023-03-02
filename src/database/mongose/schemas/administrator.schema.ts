/*
 * @Author: Lee
 * @Date: 2023-02-21 14:05:52
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 16:59:54
 * @Description:
 */

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'administrators', autoIndex: true })
export class Administrator {
  // -- 用户名
  @Prop({ unique: true, index: true })
  username: string;

  // -- 密码
  @Prop()
  password: string;

  // -- 昵称
  @Prop()
  nickname: string;

  // -- 头像
  @Prop()
  avatar: string;

  // -- 解密盐
  @Prop()
  salt: string;

  // -- 角色ID
  @Prop()
  roleId: string;

  // -- 创建者
  @Prop({ default: '超管' })
  createBy: string;

  // -- 创建时间
  @Prop({ default: '' })
  createDate: string;

  // -- 最后登录时间
  @Prop({ default: '' })
  lastLoginTime: string;

  // -- 用户状态
  @Prop({ default: 1 })
  state: number;
}

export type AdministratorDocument = Administrator & Document;
export const AdministratorSchema = SchemaFactory.createForClass(Administrator);
