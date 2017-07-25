import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Title} from "@angular/platform-browser";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {InviteSocketService} from "../../../websocket/socket/invite-socket.service";
import {InviteMessage} from "../../../websocket/model/invite-message.model";
import {InviteUser} from "../../model/invite-user.model";
import {InviteMessageType} from "../../../websocket/message-type/invite-message-type.enum";
import {ToastsManager} from "_ng2-toastr@4.1.2@ng2-toastr/ng2-toastr";
import {ToastOptions} from "ng2-toastr";
import {MdDialog} from "@angular/material";
import {InviteMessageComponent} from "../invite-message/invite-message.component";
import {Router} from "@angular/router";

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
  inviteCount=0;
  constructor(private loginService:LoginService,private title:Title,private formBuilder:FormBuilder,
  private inviteSocketService:InviteSocketService,  public inviteUser:InviteUser,
              private toastsManager: ToastsManager, private vcr: ViewContainerRef,
              private toastOptions: ToastOptions,
              private inviteMessage:InviteMessage,private  dialog: MdDialog,private router:Router
  ) {
    this.toastsManager.setRootViewContainerRef(vcr);
    loginService.headerTitle="邀请另一半";
    title.setTitle("红果情侣-邀请另一半");
    this.initData();
  }
  receiveMessage(message:InviteMessage){
    if(message.type==InviteMessageType.INVITE){//收到了邀请
      if(message.status){
        this.loginService.inviteMessage=[message];
        this.openMessageDialog();
      }
    }else if (message.type==InviteMessageType.AGREE){//接受了你的邀请
      if(message.status){
        this.router.navigateByUrl("home");
      }
    }else if (message.type==InviteMessageType.INVITE_REBACK){//邀请的成功与否的系统回复
      if(message.status){
        this.inviteIdControl.markAsPending();
        this.toastsManager.success("邀请发送成功","邀请结果",this.toastOptions);
      }else{
        this.toastsManager.error("邀请发送失败,请重试","邀请结果",this.toastOptions);
      }
    }else {//同意你的邀请回复
      if(message.status){
        this.router.navigateByUrl("home");
      }else{
        this.toastsManager.error("成为情侣失败,请重试","同意结果",this.toastOptions);
      }
    }
  }

  /**
   * 初始化数据
   */
  initData(){
    this.inviteUser.userId="";this.inviteUser.nickname="";
  }

  /**
   * 打开邀请信息的弹出框
   */
  openMessageDialog(){
    this.dialog.open(InviteMessageComponent,{
      position: {
        top: "65px",
      },
      disableClose: true
    })
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
      this.loginService.inviteMessage=this.inviteUser.invitations;
      //如果用户有邀请信息，就弹出信息框
      if(this.inviteUser.invitations.length>0){
       this.openMessageDialog()
      }
      this.inviteSocketService.connection(res.userId).subscribe(
        data=>this.receiveMessage(data),
        error=>{
          this.inviteSocketService.close();
          console.log(error)
        }
      );
    });
  }

  /**
   * 邀请另一半
   */
  doInvite(){
    this.inviteMessage.inviteId=this.inviteUser.userId;
    this.inviteMessage.invitedId=this.inviteIdControl.value;
    this.inviteMessage.nickname=this.inviteUser.nickname;
    this.inviteMessage.profileImg=this.inviteUser.profileImg;
    this.inviteMessage.type=InviteMessageType.INVITE;
    this.inviteSocketService.sendMessage(this.inviteMessage);

  }

  /**
   * 创建form表单为其增加异步表单验证
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
