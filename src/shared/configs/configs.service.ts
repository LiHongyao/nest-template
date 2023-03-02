/*
 * @Author: Lee
 * @Date: 2023-02-23 14:53:52
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 17:17:36
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { ConfigsDocument } from 'src/database/mongose/schemas';
import * as dayjs from 'dayjs';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectModel('CONFIGS')
    private readonly configsModel: Model<ConfigsDocument>,
  ) {}

  /**
   * 设置咨询电话
   * @param phone
   * @returns
   */
  async setHotline(phone: string): Promise<BaseResponse> {
    await this.configsModel.findOneAndUpdate(
      { key: 'hotline' },
      { value: phone, lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss') },
      { upsert: true },
    );
    return {};
  }

  /**
   * 查询咨询电话
   * @returns
   */
  async getHotline(): Promise<BaseResponse> {
    const configs = await this.configsModel.findOne({ key: 'hotline' });
    const value = configs ? configs.value : null;
    return { data: value };
  }
}
