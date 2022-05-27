/*
 * @Author: Lee
 * @Date: 2022-05-26 19:53:36
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 17:32:50
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/register.dto';
import { UserService } from './user.service';

@ApiTags('用户模块')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserDto) {
    return await this.userService.register(dto);
  }
}
