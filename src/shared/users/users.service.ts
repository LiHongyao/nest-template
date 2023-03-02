/*
 * @Author: Lee
 * @Date: 2023-02-19 14:32:52
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:39:25
 * @Description:
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { UserDocument } from 'src/database/mongose/schemas';
import { UserListDto } from './dto/req.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * 查询用户信息
   * @param userId
   * @returns
   */
  async info(userId: string): Promise<BaseResponse> {
    const user = await this.userModel.findById(userId);
    if (user) {
      const { _id: userId, ...results } = user.toObject();
      return { data: { userId, ...results } };
    }
    return { code: HttpStatus.NOT_FOUND, msg: '用户不存在' };
  }

  /**
   * 管理端·小程序用户列表
   */

  async list(dto: UserListDto): Promise<BaseResponse> {
    // 1. 解构参数
    const { pageSize = 10, current = 1, phone = '' } = dto;
    // 2. 计算跳过的条数
    const skipNum = (current - 1) * pageSize;
    // 3. 查询符合条件的文档总数
    const total = (
      await this.userModel.aggregate([{ $match: { phone: { $regex: phone } } }])
    ).length;
    // 4. 根据每页大小计算总页数
    const pages = Math.ceil(total / pageSize);
    // 5. 聚合查询
    const results = await this.userModel.aggregate([
      { $match: { phone: { $regex: phone } } },
      { $sort: { createDate: -1 } },
      { $skip: skipNum },
      { $limit: pageSize },
      { $project: { _id: 0 } },
    ]);
    return {
      data: results,
      page: {
        current,
        pageSize,
        total,
        pages,
      },
    };
  }
}
