/*
 * @Author: Lee
 * @Date: 2023-02-27 10:11:10
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:54:57
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { FeedbackAddDto, FeedbackListDto } from './dto/req.dto';
import { FeedbackDocument, UserDocument } from 'src/database/mongose/schemas';
import * as dayjs from 'dayjs';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('FEEDBACK_MODEL')
    private readonly feedbackModel: Model<FeedbackDocument>,
    @InjectModel('USER_MODEL') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * 添加意见反馈
   * @param dto
   * @returns
   */
  async add(dto: FeedbackAddDto, userId: string): Promise<BaseResponse> {
    const dbUser = await this.userModel.findById<UserDocument>(userId);
    const { nickname, phone } = dbUser;
    await new this.feedbackModel({
      userId,
      nickname,
      phone,
      content: dto.content,
      createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }).save();
    return {};
  }

  /**
   * 查询意见反馈
   * @param dto
   * @returns
   */
  async list(dto: FeedbackListDto): Promise<BaseResponse> {
    // 1. 解构参数
    const { pageSize = 10, current = 1 } = dto;
    // 2. 计算跳过的条数
    const skipNum = (current - 1) * pageSize;
    // 3. 查询符合条件的文档总数
    const total = (await this.feedbackModel.aggregate([{ $match: {} }])).length;
    // 4. 根据每页大小计算总页数
    const pages = Math.ceil(total / pageSize);
    // 5. 聚合查询
    const results = await this.feedbackModel.aggregate<FeedbackDocument>([
      // - 筛选
      { $match: {} },
      // - 将筛选的结果根据创建时间排序
      { $sort: { createDate: -1 } },
      // - 跳过指定条数
      { $skip: skipNum },
      // - 返回指定条数
      { $limit: pageSize },
      // - 新增字段
      { $addFields: { id: '$_id' } },
      // - 格式化输出
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
