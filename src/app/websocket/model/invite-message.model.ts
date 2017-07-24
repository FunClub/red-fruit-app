/**
 * 发送邀请另一半的消息模型
 */
export class InviteMessage {
  inviteId:string;
  invitedId:string;
  profileImg:string;
  nickname:string;
  type:number;
  /**
   * 消息的状态，true成功，false失败
   */
  status:boolean;
}
