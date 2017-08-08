/**
 * 查询评论时的条件模型
 */
export class SelectDiscussionCondition{
  artId:string;
  sortBy:string;
  pageIndex:number;
  pageSize:number;

  constructor() {
    this.sortBy="hot";
    this.pageIndex=0;
    this.pageSize=10;
  }
}
