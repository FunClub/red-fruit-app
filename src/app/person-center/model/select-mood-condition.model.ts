/**
 * 查询心情的条件
 */
export class SelectMoodCondition {
  byHalf:boolean;
  pageIndex:number;
  pageSize:number;

  constructor() {
    this.pageIndex=0;
    this.pageSize=5;
  }
}
