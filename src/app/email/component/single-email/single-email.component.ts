import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from "../../../share/model/base/rf-editor-options.model";
import {HomeService} from "../../../home/service/home.service";
import {EmailService} from "../../service/email.service";
import {ActivatedRoute} from "@angular/router";
import {AddEmailContent, InsertEmailContent, ShowEmail, ShowEmailContent} from "../../model/email.model";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {BaseSocketService} from "../../../websocket/socket/base-socket.service";
import {ToastsManager} from "ng2-toastr";
import {NoticeMessage} from "../../../websocket/model/notice-message.model";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-single-email',
  templateUrl: './single-email.component.html',
  styleUrls: ['./single-email.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-50px)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(5px)',  offset: 0.5}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)',offset:0}),
          style({opacity: 0.5, transform: 'translateY(5px)',offset:0}),
          style({opacity: 0, transform: 'translateY(-50px)',offset:0})
        ]))
      ])
    ])
  ]
})
export class SingleEmailComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170815194635-44095884520160925141201400409029QQ%E6%88%AA%E5%9B%BE20160925141102.png";
  /**
   * 编辑器参数
   */
  rfOptions:RfEditorOptions;
  /**
   * 邮件id
   */
  emailId:string;
  /**
   * 显示邮件的模型
   */
  email:ShowEmail;
  ngBusy:any;
  /**
   * 邮件内容数组
   */
  emailContent:ShowEmailContent[];
  /**
   * 当前内容
   */
  currentContent:ShowEmailContent;

  /**
   *添加邮件内容模型
   */
  addEmail:AddEmailContent;

  /**
   * 显示更多邮件内容
   */
  showMore:boolean;
  constructor(public api:RedFruitApi,private homeService:HomeService,private emailService:EmailService,private activatedRoute:ActivatedRoute,
  private socketService:BaseSocketService,private toastsManager:ToastsManager
  ) {
    this.rfOptions = new RfEditorOptions();
    this.emailId = activatedRoute.snapshot.params['emailId'];
    this.email = new ShowEmail();

    this.addEmail = new AddEmailContent();
    this.addEmail.emailContent = new InsertEmailContent();
    this.addEmail.emailId=this.emailId;

    this.showMore =false;
  }

  ngOnInit() {
    this.initEditor();
    this.selectEmail();
  }
  selectEmail(){
    this.ngBusy=this.emailService.selectEmail(this.emailId).subscribe(res=>{
      this.email=res;
      this.emailContent = this.email.emailContents;
      this.currentContent = this.emailContent[this.emailContent.length-1];
      this.emailContent.pop();
    });
  }
  /**
   * 初始化编辑器参数
   */
  initEditor(){
    this.rfOptions.placeholderText="亲爱的"+this.homeService.homeInfo.nickname+",快回复他吧";
    this.rfOptions.toolbarButtons=['emoticons','fontSize','bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsXS=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsSM=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.height=120;

  }
  replyEmail(){
    this.emailService.addEmailContent(this.addEmail).subscribe(res=>{
      if(res){
        this.toastsManager.success("邮件回复成功","回复结果");
        this.addEmail.emailContent.content="";
        this.selectEmail();
        $(".mat-sidenav-container").scrollTop(0);
        let message = new NoticeMessage();
        message.type="reply-email";
        message.sendUserId=this.homeService.homeInfo.userId;
        message.receivedUserId = this.email.emailUserId;
        message.sendProfileImg = this.homeService.homeInfo.profileImg;
        message.sendNickname = this.homeService.homeInfo.nickname;
        this.socketService.sendMessage(message);
      }else{
        this.toastsManager.error("邮件回复失败...请重试","回复结果");
      }
    });

  }
}
