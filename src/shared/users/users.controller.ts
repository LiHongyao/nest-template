/*
 * @Author: Lee
 * @Date: 2023-02-19 14:32:29
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 22:44:02
 * @Description:
 */
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { JWTPayloadProps } from '../auth/jwt.strategy';
import { UserListDto } from './dto/req.dto';
import { UsersService } from './users.service';

@ApiTags('用户相关')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '用户信息' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: '登录Token',
  })
  @Get('info')
  async info(@Req() req: Request & { user: JWTPayloadProps }) {
    return await this.usersService.info(req.user.sub);
  }

  @Public()
  @ApiOperation({ summary: '用户列表' })
  @Post('list')
  async list(@Body() dto: UserListDto) {
    return await this.usersService.list(dto);
  }
}
