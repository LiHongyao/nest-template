/*
 * @Author: Lee
 * @Date: 2023-02-19 22:35:16
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 22:56:44
 * @Description:
 */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadForUpyunDto } from './dto/req.dto';
import { Public } from 'src/core/decorators/public.decorator';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '获取上传签名：又拍云' })
  @Post('getSignForUpyun')
  async getSignForUpyun(@Body() dto: UploadForUpyunDto) {
    return await this.uploadService.getSignForUpyun(dto.key);
  }

  @Public()
  @ApiOperation({ summary: '获取上传签名：阿里云·OSS' })
  @Get('getSignForOSS')
  async getSignForOSS() {
    return await this.uploadService.getSignForOSS();
  }
}
