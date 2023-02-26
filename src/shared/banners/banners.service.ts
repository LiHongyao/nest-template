/*
 * @Author: Lee
 * @Date: 2023-02-19 14:33:58
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 21:07:45
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2023-02-19 14:33:58
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-21 17:54:20
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { BannerDocument } from 'src/database/mongose/schemas/banner.schema';
import { BannerAddOrUpdateDto, GetBannersDto } from './dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel('BANNER_MODEL')
    private readonly bannerModel: Model<BannerDocument>,
  ) {}

  /**
   * 新增/配置轮播图
   * @param dto
   * @returns
   */
  async addOrUpdate(dto: BannerAddOrUpdateDto): Promise<BaseResponse> {
    const { id, ...fileds } = dto;
    if (id) {
      await this.bannerModel.findByIdAndUpdate(id, {
        ...fileds,
      });
    } else {
      await new this.bannerModel({ ...dto }).save();
    }
    return {};
  }

  /**
   * 小程序·查询轮播图列表
   * @returns
   */
  async list(): Promise<BaseResponse> {
    const results = await this.bannerModel.aggregate([
      // 1. 查询已启用的数据
      { $match: { state: 1 } },
      // 2. 为了方便比较时间，先根据起始时间字符串生成Date类型的起始时间
      {
        $addFields: {
          id: '$_id',
          startDate: { $toDate: '$start' },
          endDate: { $toDate: '$end' },
        },
      },
      // 3. 根据日期过滤数据
      {
        $match: {
          startDate: { $lt: new Date() } /** 开始时间小于当前时间 */,
          endDate: { $gt: new Date() } /** 结束时间大于当前时间 */,
        },
      },
      {
        $project: { _id: 0, startDate: 0, endDate: 0 },
      },
    ]);
    return { data: results ?? [] };
  }

  /**
   * 管理端·查询轮播图列表
   * @param dto
   * @returns
   */
  async listForAdmin(dto: GetBannersDto): Promise<BaseResponse> {
    // 1. 解构参数
    const { pageSize = 10, current = 1, state } = dto;
    // 2. 计算跳过的条数
    const skipNum = (current - 1) * pageSize;
    // 3. 查询符合条件的文档总数
    const total = (
      await this.bannerModel.aggregate([
        { $match: state === undefined ? {} : { state: +state } },
      ])
    ).length;
    // 4. 根据每页大小计算总页数
    const pages = Math.ceil(total / pageSize);
    // 5. 聚合查询
    const results = await this.bannerModel.aggregate<BannerDocument>([
      // - 首先根据状态筛选
      { $match: state === undefined ? {} : { state: +state } },
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

  /**
   * 切换状态
   * @param id
   */
  async switchStatus(id: string) {
    const banner = await this.bannerModel.findById<BannerDocument>(id);
    const state = banner.state === 0 ? 1 : 0;
    await this.bannerModel.findByIdAndUpdate(id, { state });
    return {};
  }
}
