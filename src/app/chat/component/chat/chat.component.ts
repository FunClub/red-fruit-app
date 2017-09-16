import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {RfEditorOptions} from "../../../share/model/base/rf-editor-options.model";
import {BaseSocketService} from "../../../websocket/socket/base-socket.service";
import {HomeService} from "../../../home/service/home.service";
import {NoticeMessage} from "../../../websocket/model/notice-message.model";
import {ChatService} from "../../service/chat.service";
import {ShowChat} from "../../model/show-chat.model";
import {ChatApi} from "../../model/chat-api.model";
import {RedFruitApi} from "../../../share/model/base/api.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewChecked {
  ngAfterViewChecked(): void {
    $('.chat-content').scrollTop(1000000);
  }


  rfOptions:RfEditorOptions;
  chats:NoticeMessage[];
  chatMessage:ShowChat;
  constructor(public homeService:HomeService,public api:RedFruitApi,private chatService:ChatService,private chatApi:ChatApi) {
    this.rfOptions = new RfEditorOptions();
    this.rfOptions.height=80;
    this.chats=[];
    this.chatMessage = new ShowChat();

  }
  ngAfterViewInit(){
    $('.fr-box a').remove();
  }
  ngOnInit() {
    this.homeService.getHomeInfo().subscribe(res=>{
      this.chatMessage.sendUserId=this.homeService.homeInfo.userId;
      this.chatMessage.halfId = this.homeService.homeInfo.halfId;
      this.chatMessage.receivedUserId=this.homeService.homeInfo.halfUserId;
      this.chatMessage.sendNickname=this.homeService.homeInfo.nickname;
      this.chatMessage.sendProfileImg=this.homeService.homeInfo.profileImg;
    });
    this.chatService.connection(this.api.CHAT_SOCKET(this.homeService.homeInfo.userId)).subscribe(data=>this.receiveMessage(data));
    this.chatService.selectChat().subscribe(res=>{
      this.chats=res;

    });
  }
  receiveMessage(message:NoticeMessage){
    this.chats.push(message);
    $('.chat-content').scrollTop(1000000);
  }

  sendMessage(){
    let newMessage = new ShowChat();
    newMessage.sendUserId=this.chatMessage.sendUserId;
    newMessage.halfId=this.chatMessage.halfId;
    newMessage.receivedUserId=this.chatMessage.receivedUserId;
    newMessage.sendNickname=this.chatMessage.sendNickname;
    newMessage.sendProfileImg=this.chatMessage.sendProfileImg;
    newMessage.content=this.chatMessage.content;
    this.chats.push(newMessage);

    this.chatService.sendMessage(this.chatMessage);
    this.chatMessage.content="";
  }
  getPotion(chat:ShowChat){
    return chat.sendUserId==this.homeService.homeInfo.userId;
  }
}

