import {NoticeArt} from "../../../foot-mark/model/notice-art.model";
/**
 * 发送父级评论的模型
 */
export class InsertDiscussion {
  parentDiscussion:ParentDiscussion;
  noticeArt:NoticeArt;

  constructor() {
    this.parentDiscussion = new ParentDiscussion();
    this.noticeArt = new NoticeArt();
  }
}
export class ParentDiscussion{
  artId:string;
  content:string;
}
