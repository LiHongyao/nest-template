/*
 * @Author: Lee
 * @Date: 2023-02-27 10:11:07
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:47:12
 * @Description:
 */
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';
import { JWTPayloadProps } from '../auth/jwt.strategy';
import { FeedbackAddDto, FeedbackListDto } from './dto/req.dto';
import { FeedbackService } from './feedback.service';

@ApiTags('意见反馈')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ summary: '添加意见反馈' })
  @Post('add')
  async add(
    @Body() dto: FeedbackAddDto,
    @Req() req: Request & { user: JWTPayloadProps },
  ) {
    return await this.feedbackService.add(dto, req.user.sub);
  }

  @Public()
  @ApiOperation({ summary: '查询意见反馈' })
  @Post('list')
  async list(@Body() dto: FeedbackListDto) {
    return await this.feedbackService.list(dto);
  }
}
