/*
 * @Author: Lee
 * @Date: 2022-05-24 19:13:48
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 23:28:31
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/shared/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const { username, password } = dto;
    await this.userService.validatorUser(username, password);
    return { data: await this.createToken({ username }) };
  }

  async createToken(payload: { username: string }) {
    return await this.jwtService.sign(payload);
  }
}
