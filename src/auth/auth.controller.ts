/*
 * @Author: Lee
 * @Date: 2022-05-24 19:14:18
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 17:44:37
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('用户授权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '授权登录' })
  @Public()
  @Post('/signin')
  async signin(@Body() dto: LoginDto) {
    return await this.authService.signin(dto);
  }
}
