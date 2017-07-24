import {InviteMessage} from "../../websocket/model/invite-message.model";
/**
 * 登录到邀请另一半时的用户信息
 */
export class InviteUser {
  userId:string ;
  nickname:string;
  profileImg:string;
  hasHalf:boolean;
  /**
   * 邀请人信息
   */
  invitations:InviteMessage[];
}
