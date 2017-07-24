import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {InviteMessage} from "../../../websocket/model/invite-message.model";
import {InviteMessageType} from "../../../websocket/message-type/invite-message-type.enum";
import {InviteSocketService} from "../../../websocket/socket/invite-socket.service";

@Component({
  selector: 'app-invite-message',
  templateUrl: './invite-message.component.html',
  styleUrls: ['./invite-message.component.css']
})
export class InviteMessageComponent implements OnInit {
  inviteMessage:InviteMessage;
  constructor(private loginService:LoginService,private inviteSocketService:InviteSocketService) {
    this.inviteMessage= loginService.inviteMessage[0];
  }

  ngOnInit() {

  }
  agreeInvite(close:HTMLButtonElement){
    close.click();
    this.inviteMessage.type=InviteMessageType.AGREE;
    //清除多余信息减少网络流量
    this.inviteMessage.nickname="";
    this.inviteMessage.profileImg="";
    this.inviteSocketService.sendMessage(this.inviteMessage);
  }
  disagreeInvite(close:HTMLButtonElement){
    close.click();
  }
}
