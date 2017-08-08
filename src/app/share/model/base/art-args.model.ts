import {SelectDiscussionCondition} from "../discussion/select-discussion-condition";
/**
 * 动态操作参数模型
 */
export class ArtArgs {
  /**
   * 动态id
   */
  artId:string;
  /**
   * 点赞数量
   */
  thumbsUpCount:number;
  /**
   * 能否点赞
   */
  thumbsUpAble:boolean;

  /**
   * 打开评论与否
   * @type {boolean}
   */
  isDiscussOpen:boolean;

  /**
   * 评论数量
   */

  discussionCount:number;

  /**
   * 动态类型
   */

  artType:string;


  /**
   * 查询评论条件
   */
  selectDiscussionCondition:SelectDiscussionCondition;
  constructor() {
    this.isDiscussOpen=false;

  }
}
