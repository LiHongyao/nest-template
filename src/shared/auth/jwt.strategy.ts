/*
 * @Author: Lee
 * @Date: 2023-02-19 16:10:23
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-22 16:54:20
 * @Description:
 */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANT } from './jwt.constant';

export interface JWTPayloadProps {
  // → 通常，token存储的数据只需要存储用户ID即可
  // → 这里我们选择使用 【sub】来替代【userId】 属性名是为了保持我们的 userId 值与JWT 标准一致。
  sub: string;
  // → 小程序用户登录时解析出来的session_key
  // → 其他接口可能会用到它去解析一些东西，比如手机号等等
  // → 所以为了方便，这里也直接存入token中，这样就可以方便在@Req()中读取它
  session_key?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // → 提供从请求中提取 JWT 的方法
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // → 设置为 false
      // → 确保 JWT 没有过期的责任委托给 Passport 模块。
      // → 如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 未经授权的响应。
      ignoreExpiration: false,
      // → 秘钥
      secretOrKey: JWT_CONSTANT.secret,
    });
  }
  /**
   * JWT 验证
   * @param payload
   * @returns
   */
  async validate(payload: JWTPayloadProps): Promise<JWTPayloadProps> {
    // → 返回所需数据即可，定义路由时可通过 @Req() 访问
    return { sub: payload.sub, session_key: payload.session_key };
  }
}
