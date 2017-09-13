import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from "../../../share/model/base/rf-editor-options.model";
import {BaseSocketService} from "../../../websocket/socket/base-socket.service";
import {HomeService} from "../../../home/service/home.service";
import {NoticeMessage} from "../../../websocket/model/notice-message.model";
import {ChatService} from "../../service/chat.service";
import {ShowChat} from "../model/show-chat.model";
import {ChatApi} from "../model/chat-api.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170815194635-44095884520160925141201400409029QQ%E6%88%AA%E5%9B%BE20160925141102.png"
  rfOptions:RfEditorOptions;
  chats:NoticeMessage[];
  chatMessage:ShowChat;
  constructor(private homeService:HomeService,private chatService:ChatService,private chatApi:ChatApi) {
    this.rfOptions = new RfEditorOptions();
    this.chats=[];
    this.chatMessage = new ShowChat();
    this.chatMessage.sendUserId=homeService.homeInfo.userId;
    this.chatMessage.sendNickname=homeService.homeInfo.nickname;
    this.chatMessage.sendProfileImg=homeService.homeInfo.profileImg;
  }

  ngOnInit() {
    this.chatService.connection(this.chatApi.CHAT_SOCKET(this.homeService.homeInfo.userId)).subscribe(data=>this.receiveMessage(data));
    this.chatService.selectChat().subscribe(res=>{
      console.log(res);
    });
  }
  receiveMessage(message:NoticeMessage){

  }

  sendMessage(){
    this.chatService.sendMessage(this.chatMessage);
  }
}
