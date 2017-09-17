import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {SelectUserComponent} from "../../../share/component/select-user/select-user.component";
import {AttentionUser} from "../../../share/model/base/attention-user.model";
import {ShareService} from "../../../share/service/share.service";
import {SelectUserArgs} from "../../model/select-user-args.model";
import {Router} from "@angular/router";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {RfEditorOptions} from "../../../share/model/base/rf-editor-options.model";
import {HomeService} from "../../../home/service/home.service";

@Component({
  selector: 'app-write-email',
  templateUrl: './write-email.component.html',
  styleUrls: ['./write-email.component.css']
})
export class WriteEmailComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170815194635-44095884520160925141201400409029QQ%E6%88%AA%E5%9B%BE20160925141102.png";
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
  rfOptions:RfEditorOptions;
  constructor(public api:RedFruitApi,private dialog:MdDialog,private shareService:ShareService,private homeService:HomeService,private router:Router) {
    this.showMain=false;
    this.selectArgs = new SelectUserArgs();
    this.rfOptions = new RfEditorOptions();
  }

  ngOnInit() {
    this.initEditor();
    this.shareService.selectAttentionUser().subscribe(res=>{
      this.selectArgs.attentionUsers=res;
      this.openSelectUser();
    });
  }
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
        this.router.navigateByUrl("/home/email/email-list")
      }else{
        this.showMain=true;
      }

  });
  }
}
