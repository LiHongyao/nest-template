import { ApiProperty } from '@nestjs/swagger';

// → 分页数据类型
export class PageProps {
  @ApiProperty({ description: '当前页' })
  current: number;
  @ApiProperty({ description: '当前每页条数页' })
  pageSize: number;
  @ApiProperty({ description: '总页数' })
  pages: number;
  @ApiProperty({ description: '总条数' })
  total: number;
}

// → 响应数据结构
export class BaseResponse<T = any> {
  @ApiProperty({ description: '状态码，成功-200' })
  code?: number;
  @ApiProperty({ description: '响应数据' })
  data?: T;
  @ApiProperty({ description: '提示信息' })
  msg?: string;
  @ApiProperty({ description: '分页信息' })
  page?: PageProps;
}
