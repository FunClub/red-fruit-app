import {PageRequest} from "../../../share/model/base/page-request.model";
/**
 * 查询心情的条件
 */
export class SelectMoodCondition extends PageRequest{
  byHalf:boolean;
  constructor() {
    super();
    this.pageIndex=0;
    this.pageSize=10;
    this.sortBy="date";
  }
}
