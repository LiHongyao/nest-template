/*
 * @Author: Lee
 * @Date: 2022-05-26 19:53:36
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 21:43:31
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserDto) {
    return await this.userService.register(dto);
  }
}
