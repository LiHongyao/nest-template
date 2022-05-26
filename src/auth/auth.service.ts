/*
 * @Author: Lee
 * @Date: 2022-05-24 19:13:48
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 22:02:59
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(dto: LoginDto) {
    const { phone, password } = dto;
    const dbUser = await this.userService.findUser(phone);
    if (dbUser) {
      if (password === dbUser.password) {
        return { code: 0, data: dbUser, msg: 'success' };
      }
      return { code: 1, msg: '账号或密码错误' };
    }
    return { code: 1, msg: '用户不存在' };
  }
}
