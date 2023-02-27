/*
 * @Author: Lee
 * @Date: 2023-02-27 14:02:14
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 15:34:09
 * @Description:
 */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Headers,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { JWTPayloadProps } from '../auth/jwt.strategy';
import { AddressService } from './address.service';
import { AddressAddOrUpdateDto } from './dto/req.dto';

@ApiTags('收货地址管理')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: '添加/编辑地址' })
  @Post('addOrUpdate')
  async addOrUpdate(
    @Body() dto: AddressAddOrUpdateDto,
    @Req() req: Request & { user: JWTPayloadProps },
  ) {
    return await this.addressService.addOrUpdate(dto, req.user.sub);
  }

  @ApiOperation({ summary: '查询地址列表' })
  @ApiHeader({ name: 'platform', description: '平台', enum: ['MP', 'ADMIN'] })
  @Get('/list')
  async list(
    @Headers('platform') platform: string,
    @Req() req: Request & { user: JWTPayloadProps },
  ) {
    return await this.addressService.list(platform, req.user.sub);
  }

  @Public()
  @ApiOperation({ summary: '移除地址' })
  @ApiParam({ name: 'id', description: '地址ID' })
  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.addressService.remove(id);
  }
}
