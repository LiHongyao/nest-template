/*
 * @Author: Lee
 * @Date: 2022-05-24 23:09:57
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 23:23:00
 * @Description:
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  /**
   * 校验用户
   * @param username
   * @param password
   */
  async validatorUser(username: string, password: string) {
    if (username !== 'admin' && password !== '123') {
      throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST);
    }
  }
}
