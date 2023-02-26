/*
 * @Author: Lee
 * @Date: 2023-02-19 14:33:52
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-24 20:28:43
 * @Description:
 */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BannersService } from './banners.service';
import { BannerAddOrUpdateDto, GetBannersDto } from './dto';

@ApiTags('轮播图')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @ApiOperation({ summary: '添加或编辑轮播图' })
  @Post('addOrUpdate')
  async addOrUpdate(@Body() dto: BannerAddOrUpdateDto) {
    return await this.bannersService.addOrUpdate(dto);
  }

  @ApiOperation({ summary: '小程序·轮播图列表' })
  @Get('list')
  async list() {
    return await this.bannersService.list();
  }

  @ApiOperation({ summary: '管理端·轮播图列表' })
  @Post('list-admin')
  async listForAdmin(@Body() dto: GetBannersDto) {
    return await this.bannersService.listForAdmin(dto);
  }


  @ApiOperation({ summary: '切换活动状态' })
  @ApiParam({ name: 'id', description: '轮播图ID' })
  @Put('switch-status/:id')
  async switchStatus(@Param('id') id: string) {
    return await this.bannersService.switchStatus(id);
  }
}
