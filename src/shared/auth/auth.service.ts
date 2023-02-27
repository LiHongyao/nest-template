/*
 * @Author: Lee
 * @Date: 2023-02-19 17:08:54
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:54:02
 * @Description:
 */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { lastValueFrom, map } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadProps } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { LoginForAdminDto } from './dto/req.dto';
import { encript } from 'src/utils';
import {
  AdministratorDocument,
  UserDocument,
} from 'src/database/mongose/schemas';
import * as dayjs from 'dayjs';

const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<UserDocument>,
    @InjectModel('ADMINISTRATOR_MODEL')
    private readonly adminModel: Model<AdministratorDocument>,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  /**
   * 登录
   * @param code
   * @returns
   */
  async login(code: string): Promise<BaseResponse<{ token: string }>> {
    // → 调用微信API，解析：session_key & openid
    const params = {
      appid: this.configService.get('mp.appID'),
      secret: this.configService.get('mp.appsecret'),
      js_code: code,
      grant_type: 'authorization_code',
    };
    const uri = 'https://api.weixin.qq.com/sns/jscode2session';
    const resp = await lastValueFrom(
      this.httpService.get(uri, { params }).pipe(map((resp) => resp.data)),
    );
    const { session_key, openid, errcode, errmsg } = resp;
    if (errcode) {
      throw new HttpException(errmsg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // → 生产token
    const token = await this.createToken({ session_key, sub: openid });
    // → 校验用户是否存在，存在直接返回token，不存在则新建用户之后再返回token
    const dbUser = await this.userModel.findOne({ userId: openid });
    if (dbUser) {
      return { data: { token } };
    }
    // → 注册用户
    logger.log(`注册新用户，openid：${openid}`);
    await new this.userModel({
      _id: openid /** 使用openid当做用户id */,
      createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }).save();
    return { data: { token } };
  }

  /**
   *
   */
  async loginForAdmin(dto: LoginForAdminDto): Promise<BaseResponse> {
    const { username, password } = dto;
    // → 判断用户是否存在
    const dbUser = await this.adminModel.findOne({ username });
    if (dbUser) {
      const psw = encript(password, dbUser.salt);
      if (username == dbUser.username && psw == dbUser.password) {
        const token = await this.createToken({ sub: dbUser._id.toString() });
        const data = {
          token,
          access: [],
          user: { nickname: dbUser.nickname, avatar: dbUser.avatar },
        };
        // -- 更新最后登录时间
        await this.adminModel.findByIdAndUpdate(dbUser._id, {
          lastLoginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
        return { data };
      }
      return { code: HttpStatus.BAD_REQUEST, msg: '密码错误！' };
    }
    // → 用户不存在
    return { code: HttpStatus.BAD_REQUEST, msg: '用户不存在！' };
  }

  /**
   * 生成token
   * 临时笔记：
   * - 使用jwt的缺陷是派发的token在有效期内一直有效，意味着可以同时登陆，只要token不过期就行
   * - 通常会采用自己生成token的办法，然后将其存到Redis或者单独一张表，可以处理退出登录。
   * @param payload → {sub: string}
   * @returns
   */
  async createToken(payload: JWTPayloadProps) {
    return await this.jwtService.sign(payload);
  }
}
