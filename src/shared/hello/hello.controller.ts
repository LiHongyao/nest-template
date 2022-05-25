/*
 * @Author: Lee
 * @Date: 2022-05-24 20:55:25
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 21:31:51
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('hello')
export class HelloController {
  @Post('insert')
  async insert(@Body() dto: CreateTodoDto) {
    console.log(dto);
    return { code: 0, data: dto };
  }
}
