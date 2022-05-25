/*
 * @Author: Lee
 * @Date: 2022-05-24 22:28:50
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 22:36:29
 * @Description: 文件上传
 */
import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadDto } from './dto/upload.dto';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '获取上传上传签名：又拍云' })
  @Post('getSignForUpyun')
  async getSignForUpyun(@Body() dto: UploadDto) {
    return await this.uploadService.getSignForUpyun(dto.key);
  }
}
