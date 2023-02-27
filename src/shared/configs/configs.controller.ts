/*
 * @Author: Lee
 * @Date: 2023-02-23 14:53:44
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 18:52:04
 * @Description:
 */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { ConfigsService } from './configs.service';
import { SetHotlineDto } from './dto/req.dto';

@ApiTags('配置相关')
@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Public()
  @ApiOperation({ summary: '设置咨询电话' })
  @Post('setHotline')
  async setHotline(@Body() dto: SetHotlineDto) {
    return await this.configsService.setHotline(dto.phone);
  }

  @Public()
  @ApiOperation({ summary: '查询咨询电话' })
  @Get('getHotline')
  async getHotline() {
    return await this.configsService.getHotline();
  }
}
