/*
 * @Author: Lee
 * @Date: 2023-03-24 22:50:33
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 09:46:31
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { WxService } from 'src/libs/wx/wx.service';

@Injectable()
export class PlayerService {
  constructor(private readonly wx: WxService) {}
  async test() {
    const result = await this.wx.getAccessToken();
    return { data: result };
  }
}
