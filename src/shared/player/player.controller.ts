/*
 * @Author: Lee
 * @Date: 2023-03-24 22:50:41
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-24 22:53:52
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { PlayerService } from './player.service';

@ApiTags('接口测试（临时）')
@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Public()
  @ApiOperation({ summary: '功能测试接口' })
  @Get('/test')
  async test() {
    return await this.playerService.test();
  }
}
