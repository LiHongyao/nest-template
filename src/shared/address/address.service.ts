/*
 * @Author: Lee
 * @Date: 2023-02-27 14:02:16
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:53:07
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { AddressDocument } from 'src/database/mongose/schemas';
import { AddressAddOrUpdateDto } from './dto/req.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('ADDRESS_MODEL')
    private readonly addressModel: Model<AddressDocument>,
  ) {}

  /**
   * 新增或编辑地址
   * @param dto
   * @param userId
   * @returns
   */
  async addOrUpdate(
    dto: AddressAddOrUpdateDto,
    userId: string,
  ): Promise<BaseResponse> {
    const { id, ...fileds } = dto;
    // 1. 首先判断用户是否设为默认，如果是，则将上一次的默认地址取消
    if (fileds.isDefault) {
      await this.addressModel.updateMany(
        {
          userId,
          isDefault: 1,
        },
        { isDefault: 0 },
      );
    }
    // 2. 正常处理添加编辑理逻辑
    if (id) {
      await this.addressModel.findByIdAndUpdate(id, {
        ...fileds,
      });
    } else {
      await new this.addressModel({ ...dto, userId }).save();
    }
    return {};
  }

  /**
   * 查询地址信息
   * @param platform 平台：MP/ADMIN
   * @param userId
   * @returns
   */
  async list(platform: string, userId: string): Promise<BaseResponse> {
    // 判断平台，如果是ADMIN则查询所有的地址信息，否则根据用户ID查询
    const results = await this.addressModel.aggregate([
      { $match: platform === 'ADMIN' ? {} : { userId } },
      { $addFields: { id: '$_id' } },
      { $project: { _id: 0 } },
    ]);
    return { data: results ?? [] };
  }

  /**
   * 移除地址
   * @param id 地址ID
   * @returns
   */
  async remove(id: string): Promise<BaseResponse> {
    await this.addressModel.findByIdAndRemove(id);
    return {};
  }
}
