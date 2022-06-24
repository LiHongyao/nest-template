/*
 * @Author: Lee
 * @Date: 2022-06-24 17:35:31
 * @LastEditors: Lee
 * @LastEditTime: 2022-06-24 17:43:51
 * @Description:
 */
import { Controller, Get, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';

@ApiTags('测试接口')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiOperation({ summary: '获取信息' })
  @Get('info')
  async info(@Headers() token) {
    console.log(token);
    return { code: 0, data: 'Hello' };
  }
}
