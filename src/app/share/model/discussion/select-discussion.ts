/**
 * 查询评论时的条件模型
 */
export class SelectDiscussion{
  artId:string;
  sortBy:string;
  pageIndex:number;
  pageSize:number;

  constructor() {
    this.sortBy="latest";
    this.pageIndex=0;
    this.pageSize=10;
  }
}
