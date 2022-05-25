/*
 * @Author: Lee
 * @Date: 2022-05-24 22:28:00
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 22:28:40
 * @Description:
 */
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
