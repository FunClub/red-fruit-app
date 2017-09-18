import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from "../../../share/model/base/rf-editor-options.model";
import {HomeService} from "../../../home/service/home.service";
import {EmailService} from "../../service/email.service";
import {ActivatedRoute} from "@angular/router";
import {ShowEmail, ShowEmailContent} from "../../model/email.model";
import {RedFruitApi} from "../../../share/model/base/api.model";

@Component({
  selector: 'app-single-email',
  templateUrl: './single-email.component.html',
  styleUrls: ['./single-email.component.css']
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

  email:ShowEmail;
  ngBusy:any;
  emailContent:ShowEmailContent[];
  currentContent:ShowEmailContent;
  constructor(public api:RedFruitApi,private homeService:HomeService,private emailService:EmailService,private activatedRoute:ActivatedRoute) {
    this.rfOptions = new RfEditorOptions();
    this.emailId = activatedRoute.snapshot.params['emailId'];
    this.email = new ShowEmail();
  }

  ngOnInit() {
    this.initEditor();
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
}
