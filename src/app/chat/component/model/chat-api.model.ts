export class ChatApi {
  /**
   * 聊天
   * @type {string}
   */
  CHAT:string="/chat/";

  CHAT_SOCKET(userId:string){
    return `ws://localhost/chat/${userId}`
  }
}
