/*
 * @Author: Lee
 * @Date: 2023-02-19 17:08:38
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 09:46:46
 * @Description:
 */
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginForMPDto, LoginForAdminDto } from './dto/req.dto';

const logger = new Logger('auth.controller');

@Public()
@Controller('auths')
@ApiTags('用户鉴权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: '小程序登录' })
  @Post('login')
  async login(@Body() dto: LoginForMPDto) {
    return await this.authService.login(dto.code);
  }

  @Public()
  @ApiOperation({ summary: '后台管理系统登录' })
  @Post('/login-admin')
  async loginForAdmin(@Body() dto: LoginForAdminDto) {
    return await this.authService.loginForAdmin(dto);
  }
}
