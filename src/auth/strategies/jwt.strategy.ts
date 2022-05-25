/*
 * @Author: Lee
 * @Date: 2022-05-24 22:52:17
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 23:00:36
 * @Description:
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANT } from 'src/common/constants/common.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.secret,
    });
  }
  async validate(payload: { userId: string }) {
    return { userId: payload.userId };
  }
}
