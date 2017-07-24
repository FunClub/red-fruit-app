import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {InviteSocketService} from "../../../websocket/socket/invite-socket.service";
import {InviteMessage} from "../../../websocket/model/invite-message.model";
import {InviteUser} from "../../model/invite-user.model";

@Component({
  selector: 'app-invite-body',
  templateUrl: './invite-body.component.html',
  styleUrls: ['./invite-body.component.css']
})
export class InviteBodyComponent implements OnInit {

  /**
   * 邀请的form
   */
  inviteForm:FormGroup;

  /**
   * 被邀请人
   */
  inviteIdControl:FormControl;

  constructor(private loginService:LoginService,private title:Title,private formBuilder:FormBuilder,
  private inviteSocketService:InviteSocketService,private inviteMessage:InviteMessage,public inviteUser:InviteUser
  ) {
    loginService.headerTitle="邀请另一半";
    title.setTitle("红果情侣-邀请另一半");
  }

  /**
   * 初始化数据
   * 1.获取用户的id和昵称等
   * 2.连接到邀请另一半的socket
   */
  ngOnInit() {
    this.createForm();
    this.loginService.getInviteUserInfo().subscribe(res=>{
      this.inviteUser=res;
      this.inviteSocketService.connection(res.userId).subscribe(
        data=>console.log(data)
      );
    });
  }

  doInvite(){
    this.inviteMessage.inviteId=this.inviteUser.userId;
    this.inviteMessage.invitedId=this.inviteIdControl.value;
    this.inviteMessage.nickname=this.inviteUser.nickname;
    this.inviteMessage.profileImg=this.inviteUser.profileImg;
    alert(1);
    this.inviteSocketService.sendMessage(this.inviteMessage);
  }

  /**
   * 创建form表单
   */
  createForm(){
      this.inviteForm=this.formBuilder.group({
        "invitedId":[
          "",[Validators.required,Validators.minLength(6)],[(control: FormControl) => {
            return this.canInviteAble(control, this.loginService)
          }]
        ]
      });
      this.inviteIdControl=this.inviteForm.get('invitedId') as FormControl;
  }

  /**
   * 判断用户输入的红果号能否邀请对方
   * @param invitedIdControl 被邀请人id的输入框
   * @param loginService 登录服务
   * @returns {Observable<ValidationErrors|null>}
   */
  canInviteAble(invitedIdControl:FormControl,loginService:LoginService):Observable<ValidationErrors | null>{
    let invitedId = invitedIdControl.value;
    if(invitedId.length>=6){
      return this.loginService.canInviteAble(invitedId);
    }
  }
}
