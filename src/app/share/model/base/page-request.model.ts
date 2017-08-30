/**
 * 分页查询模型
 */
export class PageRequest {
  pageIndex:number;
  pageSize:number;
  sortBy:string;

  constructor() {
    this.pageIndex=0;
    this.pageSize=10;
  }
}
