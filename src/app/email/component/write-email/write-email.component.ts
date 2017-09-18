import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {SelectUserComponent} from "../../../share/component/select-user/select-user.component";
import {AttentionUser} from "../../../share/model/base/attention-user.model";
import {ShareService} from "../../../share/service/share.service";
import {SelectUserArgs} from "../../model/select-user-args.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {RfEditorOptions} from "../../../share/model/base/rf-editor-options.model";
import {HomeService} from "../../../home/service/home.service";
import {InsertEmail, InsertEmailContent} from "../../model/email.model";
import {EmailService} from "../../service/email.service";
import {ToastsManager} from "ng2-toastr";
import {BaseSocketService} from "../../../websocket/socket/base-socket.service";
import {NoticeMessage} from "../../../websocket/model/notice-message.model";

@Component({
  selector: 'app-write-email',
  templateUrl: './write-email.component.html',
  styleUrls: ['./write-email.component.css']
})
export class WriteEmailComponent implements OnInit {

  /**
   * 关注用户
   */
  attentionUser:AttentionUser;

  /**
   * 选择用户参数
   */
  selectArgs:SelectUserArgs;

  /**
   * 显示主页面
   */
  showMain:boolean;

  /**
   * 编辑器参数
   */
  rfOptions:RfEditorOptions;

  /**
   * 邮件模型
   */
  email:InsertEmail;
  emailContent:InsertEmailContent;
  emailSubscribe:any;
  constructor(public api:RedFruitApi,private dialog:MdDialog,private shareService:ShareService,private homeService:HomeService,private router:Router,
  private emailService:EmailService,private toastsManager:ToastsManager,private activatedRoute:ActivatedRoute,private socketService:BaseSocketService
  ) {
    this.showMain=false;
    this.selectArgs = new SelectUserArgs();
    this.rfOptions = new RfEditorOptions();

    /*初始化email模型*/
    this.email = new InsertEmail();
    this.emailContent = new InsertEmailContent();
    this.email.emailContents=[this.emailContent];
  }

  ngOnInit() {
    this.initEditor();
    this.emailSubscribe=this.shareService.selectAttentionUser().subscribe(res=>{
      this.selectArgs.attentionUsers=res;
      let userId=this.activatedRoute.snapshot.params['userId'];
      /*从外部选择用户进入写邮件*/
      if(userId){
        for(let user of res as AttentionUser[]){
          if(user.userId==userId){
            this.attentionUser=user;
            this.showMain=true;
            break;
          }
        }
        if(!this.showMain){
          this.emailService.selectReceivedUser(userId).subscribe(res=>{
            this.attentionUser=res;
            this.showMain=true;
          })
        }
      }else{
        this.openSelectUser();
      }

    });
  }

  /**
   * 发送邮件
   */
  sendEmail(){
    this.emailSubscribe=this.email.receiveUserId=this.attentionUser.userId;
    this.emailService.insertEmail(this.email).subscribe(res=>{
      if(res){
        this.router.navigateByUrl("/home/email/email-list");
        this.toastsManager.success("邮件发送成功","发送结果");
        let message = new NoticeMessage();
        message.type="email";
        message.sendUserId=this.homeService.homeInfo.userId;
        message.receivedUserId = this.attentionUser.userId;
        message.sendProfileImg = this.homeService.homeInfo.profileImg;
        message.sendNickname = this.homeService.homeInfo.nickname;
        this.socketService.sendMessage(message);
      }else{
        this.toastsManager.error("邮件发送失败,请重试...","发送结果");
      }

    });
  }
  /**
   * 初始化编辑器参数
   */
  initEditor(){
    this.rfOptions.placeholderText="亲爱的"+this.homeService.homeInfo.nickname+"，有什么高兴的事吗，写写吧";
    this.rfOptions.toolbarButtons=['emoticons','fontSize','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsXS=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsSM=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.height=260;

  }
  /**
   * 打开选择用户dialog
   */
  openSelectUser(){
    this.dialog.open(SelectUserComponent,{
      position:{
        top:'120px'
      }
      ,data:this.selectArgs
    }).afterClosed().subscribe(()=>{
      this.attentionUser=this.selectArgs.selectedUser;
      if(!this.attentionUser){
        this.router.navigateByUrl("/home/email/email-list");
      }else{
        this.showMain=true;
      }

  });
  }
}
