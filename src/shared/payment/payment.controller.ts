/*
 * @Author: Lee
 * @Date: 2023-03-25 11:17:42
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 11:19:54
 * @Description:
 */
import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('支付相关')
@Controller('payment')
export class PaymentController {
  @ApiOperation({ summary: '支付回调' })
  @Post('notify')
  async payCallback() {}
}
