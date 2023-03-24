/*
 * @Author: Lee
 * @Date: 2023-02-19 14:32:29
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-24 13:45:41
 * @Description:
 */
import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { JWTPayloadProps } from '../auth/jwt.strategy';
import { UserBindPhoneDto, UserEditDto, UserListDto } from './dto/req.dto';
import { UsersService } from './users.service';

@ApiTags('用户相关')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '小程序：用户信息' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: '登录Token',
  })
  @Get('info')
  async info(@Req() req: Request & { user: JWTPayloadProps }) {
    return await this.usersService.info(req.user.sub);
  }

  @ApiOperation({ summary: '小程序：编辑用户信息' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: '登录Token',
  })
  @Put('edit')
  async edit(
    @Req() req: Request & { user: JWTPayloadProps },
    @Body() dto: UserEditDto,
  ) {
    return this.usersService.edit(req.user.sub, dto);
  }

  @ApiOperation({ summary: '小程序：绑定手机号' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: '登录Token',
  })
  @Post('bindPhone')
  async bindPhone(
    @Body() dto: UserBindPhoneDto,
    @Req() req: Request & { user: JWTPayloadProps },
  ) {
    return await this.usersService.bindPhone(req.user.sub, dto);
  }

  @Public()
  @ApiOperation({ summary: '管理端：用户列表' })
  @Post('list')
  async list(@Body() dto: UserListDto) {
    return await this.usersService.list(dto);
  }
}
