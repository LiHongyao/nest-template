/*
 * @Author: Lee
 * @Date: 2023-02-26 00:42:17
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 22:40:55
 * @Description:
 */
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { AdministratorsService } from './administrators.service';
import { AdminAddOrUpdateDto, AdminListDto, ChangePswDto } from './dto/req.dto';

@ApiTags('管理员相关')
@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Public()
  @ApiOperation({ summary: '新建或编辑管理员' })
  @Post('/addOrUpdate')
  async addOrUpdate(@Body() dto: AdminAddOrUpdateDto) {
    return await this.administratorsService.addOrUpdate(dto);
  }

  @Public()
  @ApiOperation({ summary: '重置密码' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @Put('/reset-psw/:id')
  async resetPsw(@Param('id') id: string) {
    return await this.administratorsService.resetPsw(id);
  }

  @Public()
  @ApiOperation({ summary: '修改密码' })
  @Put('/change-psw')
  async changePsw(@Body() dto: ChangePswDto) {
    return await this.administratorsService.changePsw(dto);
  }

  @Public()
  @ApiOperation({ summary: '管理员列表' })
  @Post('/list')
  async list(@Body() dto: AdminListDto) {
    return await this.administratorsService.list(dto);
  }

  @Public()
  @ApiOperation({ summary: '切换状态（启用/禁用）' })
  @ApiParam({ name: 'id', description: '管理员ID' })
  @Put('/switch-status/:id')
  async switchStatus(@Param('id') id: string) {
    return await this.administratorsService.switchStatus(id);
  }
}
