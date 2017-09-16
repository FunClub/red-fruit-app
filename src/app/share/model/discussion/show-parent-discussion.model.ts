import {ShowSubDiscussion} from "./show-sub-discussion.model";
/**
 * 父级评论模型
 */
export class ShowParentDiscussion {
  content:any;
  discussionId:string;
  nickname:string;
  profileImg:string;
  shortDate:string;
  sortDate:string;
  subDiscussionDtos:ShowSubDiscussion[];
  thumbsUpCount:number;
  thumbsUpAble:boolean;
  userId:string;
  /**
   * 是否显示评论回复面板,默认是false;
   */
  showReply:boolean;
  /**
   * 是否显示名片,默认是false
   */
  showCard:boolean;
  constructor() {
    this.showCard=false;
    this.showReply = false;
  }
}
