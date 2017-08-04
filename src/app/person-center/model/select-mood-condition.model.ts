/**
 * 查询心情的条件
 */
export class SelectMoodCondition {
  byHalf:boolean;
  page:number;
  pageSize:number;

  constructor() {
    this.page=0;
    this.pageSize=10;
  }
}
