import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {InviteMessage} from "../../../websocket/model/invite-message.model";
import {InviteMessageType} from "../../../websocket/message-type/invite-message-type.enum";
import {NgProgressService} from "ngx-progressbar";
import {BaseSocketService} from "../../../websocket/socket/base-socket.service";
import {RedFruitApi} from "../../../share/model/base/api.model";

@Component({
  selector: 'app-invite-message',
  templateUrl: './invite-message.component.html',
  styleUrls: ['./invite-message.component.css']
})
export class InviteMessageComponent implements OnInit {



  /**
   * 邀请信息，从loginService中获取
   */
  inviteMessage:InviteMessage;
  constructor(private loginService:LoginService,private socketService:BaseSocketService,
  private progressService:NgProgressService,public api:RedFruitApi
  ) {
    //取出邀请组件放入loginService的邀请信息
    this.inviteMessage= loginService.inviteMessage[0];
  }
  ngOnInit(){}
  /**
   * 同意对方的邀请
   * @param close 关闭按钮
   */
  agreeInvite(close:HTMLButtonElement){
    close.click();
    this.inviteMessage.type=InviteMessageType.AGREE;
    //清除多余信息减少网络流量
    this.inviteMessage.nickname="";
    this.inviteMessage.profileImg="";
    this.socketService.sendMessage(this.inviteMessage);
  }

  /**
   * 拒绝对方的邀请
   * @param close 关闭按钮
   */
  disagreeInvite(close:HTMLButtonElement){
    this.progressService.start();
    this.loginService.deleteInvitation(this.inviteMessage.invitationId).subscribe(res=>{
      this.progressService.done();
      if(res>0){
        close.click();
      }
    })


  }
}
