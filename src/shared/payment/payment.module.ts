/*
 * @Author: Lee
 * @Date: 2023-03-25 11:17:35
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 11:18:32
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
