/*
 * @Author: Lee
 * @Date: 2023-02-26 00:42:41
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:53:30
 * @Description:
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { encript } from 'src/utils';
import { AdminAddOrUpdateDto, AdminListDto, ChangePswDto } from './dto/req.dto';
import { AdministratorDocument } from 'src/database/mongose/schemas';
import * as dayjs from 'dayjs';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectModel('ADMINISTRATOR_MODEL')
    private readonly adminModel: Model<AdministratorDocument>,
  ) {}

  /**
   * 新建或者编辑管理员
   * @param dto
   * @returns
   */
  async addOrUpdate(dto: AdminAddOrUpdateDto): Promise<BaseResponse> {
    const { id, ...fileds } = dto;
    if (id) {
      await this.adminModel.findByIdAndUpdate(id, {
        ...fileds,
      });
    } else {
      try {
        await new this.adminModel({
          ...dto,
          createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }).save();
      } catch (error) {
        return { code: HttpStatus.BAD_REQUEST, msg: '用户已存在' };
      }
    }
    return {};
  }
  /**
   * 重置密码
   * @param id
   * @returns
   */
  async resetPsw(id: string): Promise<BaseResponse> {
    const dbUser = await this.adminModel.findById<AdministratorDocument>(id);
    const salt = dbUser.salt;
    await this.adminModel.findByIdAndUpdate(id, {
      password: encript('123456', salt),
    });
    return {};
  }
  /**
   * 修改密码
   * @param dto
   * @returns
   */
  async changePsw(dto: ChangePswDto, userId: string): Promise<BaseResponse> {
    const { oldPassword, newPassword } = dto;

    // -- 查询数据库用户
    const dbUser = await this.adminModel.findById<AdministratorDocument>(
      userId,
    );
    // -- 获取盐值
    const salt = dbUser.salt;
    // -- 判断用户原始密码是否正确
    if (encript(oldPassword, salt) !== dbUser.password) {
      return { code: HttpStatus.BAD_REQUEST, msg: '原始密码错误' };
    }
    // -- 更新密码
    await this.adminModel.findByIdAndUpdate(userId, {
      password: encript(newPassword, salt),
    });
    return {};
  }

  /**
   * 查询管理员列表
   * @param dto
   * @returns
   */
  async list(dto: AdminListDto): Promise<BaseResponse> {
    const { state } = dto;
    const results = await this.adminModel.aggregate([
      { $match: state ? { state } : {} },
      { $addFields: { id: '$_id' } },
      { $project: { _id: 0, salt: 0, password: 0 } },
    ]);
    return { data: results ?? [] };
  }

  /**
   * 切换管理员状态：启用/禁用
   * @param id
   * @returns
   */
  async switchStatus(id: string): Promise<BaseResponse> {
    const dbUser = await this.adminModel.findById<AdministratorDocument>(id);
    const state = dbUser.state ? 0 : 1;
    await this.adminModel.findByIdAndUpdate(id, { state });
    return {};
  }
}
