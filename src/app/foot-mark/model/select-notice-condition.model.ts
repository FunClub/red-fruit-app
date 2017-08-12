import {PageRequest} from "../../share/model/base/page-request.model";
export class SelectNoticeCondition extends PageRequest{
  constructor() {
    super();
    this.pageIndex=0;
    this.pageSize=10;
  }
}
