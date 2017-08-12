import {NoticeArt} from "../../../foot-mark/model/notice-art.model";
/**
 * 插入子评论的模型
 */
export class InsertSubDiscussion {
  subDiscussion:SubDiscussion;
  noticeArt:NoticeArt;
  discussionId:string;

  constructor() {
    this.subDiscussion = new SubDiscussion();
    this.noticeArt = new NoticeArt();
  }
}
/**
 * 子评论模型
 */
export class SubDiscussion{
  userId:string;
  content:string;
  /**
   * 给自评论回复的用户id(回复谁，为空则是回复父评论)
   */
  sendToUserId:string;
}
