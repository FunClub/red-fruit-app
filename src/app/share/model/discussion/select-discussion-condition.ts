import {PageRequest} from "../base/page-request.model";
/**
 * 查询评论时的条件模型
 */
export class SelectDiscussionCondition extends PageRequest{
  artId:string;
  constructor() {
    super();
    this.sortBy="subDiscussionsLength";
  }
}
