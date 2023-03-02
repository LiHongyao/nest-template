/*
 * @Author: Lee
 * @Date: 2023-02-26 11:38:38
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 16:53:12
 * @Description:
 */
import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { JWTPayloadProps } from '../auth/jwt.strategy';
import { AccessAddOrUpdateDto, RoleAddOrUpdateDto } from './dto/req.dto';
import { SystemsService } from './systems.service';

@ApiTags('系统管理')
@Controller('systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  /**********************
   ** 用户权限相关
   **********************/
  @Public()
  @ApiOperation({ summary: '创建或编辑权限' })
  @Post('access/addOrUpdate')
  async accessAddOrUpdate(@Body() dto: AccessAddOrUpdateDto) {
    return await this.systemsService.accessAddOrUpdate(dto);
  }

  @Public()
  @ApiOperation({ summary: '权限列表' })
  @Get('access/list')
  async accessList() {
    return await this.systemsService.accessList();
  }
  

  @Public()
  @ApiOperation({ summary: '删除权限' })
  @ApiParam({ name: 'authId', description: '权限ID' })
  @Delete('access/remove/:authId')
  async accessRemove(@Param('authId') authId: string) {
    return await this.systemsService.accessRemove(authId);
  }

  /**********************
   ** 用户角色相关
   **********************/
  @ApiOperation({ summary: '创建或编辑角色' })
  @Post('roles/addOrUpdate')
  async roleAddOrUpdate(
    @Body() dto: RoleAddOrUpdateDto,
    @Req() req: Request & { user: JWTPayloadProps },
  ) {
    return await this.systemsService.roleAddOrUpdate(dto, req.user.sub);
  }

  @Public()
  @ApiOperation({ summary: '角色列表' })
  @Get('roles/list')
  async roleList() {
    return await this.systemsService.roleList();
  }

  @Public()
  @ApiOperation({ summary: '删除角色' })
  @ApiParam({ name: 'roleId', description: '角色ID' })
  @Delete('roles/remove/:roleId')
  async roleRemove(@Param('roleId') roleId: string) {
    return await this.systemsService.roleRemove(roleId);
  }
}
