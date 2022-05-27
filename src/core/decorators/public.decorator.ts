/*
 * @Author: Lee
 * @Date: 2022-05-27 16:47:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 16:48:05
 * @Description: 标识公共接口
 */
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
