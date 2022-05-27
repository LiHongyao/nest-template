/*
 * @Author: Lee
 * @Date: 2022-05-26 19:53:47
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 16:36:52
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/database/schemas/user.shema';
import { UserDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<UserDocument>,
  ) {}

  async findUser(phone: string) {
    return await this.userModel.findOne({ phone });
  }

  async register(dto: UserDto) {
    const { phone } = dto;
    const dbUser = await this.userModel.findOne({ phone });
    if (dbUser) {
      return { code: 1, msg: '用户已注册' };
    }
    await this.userModel.create(dto);
    return { code: 0, msg: 'success' };
  }
}
