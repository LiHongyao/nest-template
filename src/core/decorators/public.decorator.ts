/*
 * @Author: Lee
 * @Date: 2023-02-19 22:08:23
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-25 23:44:18
 * @Description:
 */

// 👉 自定义装饰器：@Public()
import { SetMetadata } from '@nestjs/common';
export const Public = () => SetMetadata('isPublic', true);
