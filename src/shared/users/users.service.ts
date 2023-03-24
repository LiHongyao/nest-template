/*
 * @Author: Lee
 * @Date: 2023-02-19 14:32:52
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-24 13:44:57
 * @Description:
 */

import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom, map } from 'rxjs';
import { BaseResponse } from 'src/common/dto/res.dto';
import { UserDocument } from 'src/database/mongose/schemas';
import { InjectRedis, RedisType } from 'src/database/redis';
import { UserBindPhoneDto, UserEditDto, UserListDto } from './dto/req.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('USER_MODEL')
    private readonly userModel: Model<UserDocument>,

    @InjectRedis()
    private readonly redis: RedisType,

    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
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
   * 编辑用户信息
   * @param userId
   * @param dto
   * @returns
   */
  async edit(userId: string, dto: UserEditDto): Promise<BaseResponse> {
    await this.userModel.findByIdAndUpdate(userId, { ...dto });
    return {};
  }

  /**
   * 绑定手机号
   * @param userId
   * @param dto
   * @returns
   */
  async bindPhone(
    userId: string,
    dto: UserBindPhoneDto,
  ): Promise<BaseResponse> {
    // 1. 处理ACCESS_TOKEN
    // -- 从redis中读取ACCESS_TOKEN
    let accessToken = await this.redis.get('MP_ACCESS_TOKEN');
    // -- 判断ACCESS_TOKEN是否存在
    if (!accessToken) {
      // → 调用微信API，解析：ACCESS_TOKEN
      const params = {
        appid: this.configService.get('mp.appID'),
        secret: this.configService.get('mp.appsecret'),
        grant_type: 'client_credential',
      };
      const uri = 'https://api.weixin.qq.com/cgi-bin/token';
      const resp = await lastValueFrom(
        this.httpService.get(uri, { params }).pipe(map((resp) => resp.data)),
      );
      const { access_token, expires_in, errmsg } = resp;
      if (errmsg) {
        throw new HttpException(errmsg, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      // → 将ACCESS_TOKEN存入redis
      await this.redis.set('MP_ACCESS_TOKEN', access_token, 'EX', expires_in);
      accessToken = access_token;
    }
    // 2. 获取手机号
    const uri = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`;
    const resp = await lastValueFrom(
      this.httpService
        .post(uri, { code: dto.code })
        .pipe(map((resp) => resp.data)),
    );
    const { errcode, errmsg, phone_info } = resp;
    if (errcode) {
      throw new HttpException(errmsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const phone = phone_info.phoneNumber;
    // 3. 更新用户信息
    await this.userModel.findByIdAndUpdate(userId, { phone });
    return {};
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
