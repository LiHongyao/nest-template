/*
 * @Author: Lee
 * @Date: 2022-05-24 22:28:50
 * @LastEditors: Lee
 * @LastEditTime: 2022-06-21 13:52:29
 * @Description: 文件上传
 */
import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadForUpyunDto } from './dto/upload.dto';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '获取上传签名：又拍云' })
  @Post('getSignForUpyun')
  async getSignForUpyun(@Body() dto: UploadForUpyunDto) {
    return await this.uploadService.getSignForUpyun(dto.key);
  }

  @ApiOperation({ summary: '获取上传签名：阿里云（OSS）' })
  @Post('getSignForOSS')
  async getSignForOSS() {
    return await this.uploadService.getSignForOSS();
  }
}
