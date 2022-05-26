/*
 * @Author: Lee
 * @Date: 2022-05-24 19:14:18
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 22:05:31
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
