/*
 * @Author: Lee
 * @Date: 2023-02-19 17:33:51
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-01 11:06:25
 * @Description:
 */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // -- value：当前处理参数
  // -- metatype：属性的元类型
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // -- plainToClass将普通的JavaScript对象转换为特定类的实例
    const object = plainToInstance(metatype, value);
    // -- 验证该对象返回出错的数组
    const errors = await validate(object);
    // -- 递归查找错误信息/返回第一个错误的msg
    const recursionErrorMsg = (errors) => {
      // -- 将错误信息数组中的第一个内容返回给异常过滤器
      const firstErrorObj = errors.shift();
      const constraints = firstErrorObj.constraints;
      if (constraints) {
        const k = Object.keys(constraints)[0];
        const errorMsg = constraints[k];
        throw new BadRequestException(errorMsg);
      } else {
        recursionErrorMsg(firstErrorObj.children);
      }
    };
    // -- 如果存在错误异常，则递查找错误信息描述
    if (errors.length > 0) {
      recursionErrorMsg(errors);
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
