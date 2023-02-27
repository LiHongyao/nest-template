/*
 * @Author: Lee
 * @Date: 2023-02-26 11:39:55
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:18:17
 * @Description:
 */

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'roles', autoIndex: true })
export class Role {
  // -- 角色名称
  @Prop({ type: String, required: true })
  roleName: string;

  // -- 权限列表
  @Prop({ type: [String], required: false })
  authIds: Array<String>;

  // -- 创建人
  @Prop({ type: String, required: false, default: '超管' })
  createBy: string;

  // -- 创建时间
  @Prop({ type: String, required: true })
  createDate: string;

  // -- 更新人
  @Prop({ type: String, required: true, default: '超管' })
  updateBy: string;

  // -- 更新时间
  @Prop({ type: String, required: true })
  updateDate: string;

  // -- 角色状态
  @Prop({ type: Number, required: false, default: 1 })
  state: number;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
