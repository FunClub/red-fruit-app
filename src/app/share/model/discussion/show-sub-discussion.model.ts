/**
 * 显示子评论DTO
 */
export class ShowSubDiscussion {
  userId:string;
  nickname:string;
  content:string;
  sortDate:string;
  shortDate:string;
  sendToNickname:string;
  /**
   * 显示子评论回复
   */
  showReply:boolean;


  constructor() {
    this.showReply=false;
  }
}
