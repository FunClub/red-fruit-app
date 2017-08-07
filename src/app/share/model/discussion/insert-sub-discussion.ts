/**
 * 插入子评论的模型
 */
export class InsertSubDiscussion {
  discussionId:string;
  contend:string;
  /**
   * 给自评论回复的用户id(回复谁，为空则是回复父评论)
   */
  sendToUserId:string;
}
