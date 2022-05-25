/*
 * @Author: Lee
 * @Date: 2022-05-24 19:14:18
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 23:14:09
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('用户验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '账号密码登录' })
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
