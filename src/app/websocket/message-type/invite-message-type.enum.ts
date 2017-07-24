/**
 * 邀请的消息类型
 * 1邀请另一半,-1对应的消息回复
 * 2同意邀请，-2对应的消息回复
 */
export enum InviteMessageType {
  INVITE=1,
  INVITE_REBACK=-1,
  AGREE=2,
  AGREE_REBACK=-2
}
