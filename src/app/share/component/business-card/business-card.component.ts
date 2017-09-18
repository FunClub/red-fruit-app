import {Component, Input, OnInit} from '@angular/core';
import {ShareService} from "../../service/share.service";
import {ShowCard} from "../../model/base/show-card.model";
import {RedFruitApi} from "../../model/base/api.model";
import {HomeService} from "../../../home/service/home.service";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  /**
   * 用户id
   */
  @Input()
  userId:string;

  /**
   * 名片
   */
  card:ShowCard;
  constructor(private shareService:ShareService,private toastsManager:ToastsManager,public api:RedFruitApi,private homeService:HomeService,
  private router:Router
  ) {
    this.card=new ShowCard();
  }

  ngOnInit() {
    this.shareService.selectCard(this.userId).subscribe(res=>{
      this.card=res;
    });
  }

  goToEmail(){
    this.router.navigate(["/home/email/write-email",{userId:this.userId}]);
  }

  /**
   * 关注用户
   */
  attention(){
    this.shareService.attentionUser(this.userId).subscribe(res=>{
      if(res){
        this.toastsManager.success("关注成功","关注结果");
        this.card.attentionAble=false;
      }else{
        this.toastsManager.error("关注失败,请重试...","关注结果");
      }
    });
  }

  /**
   * 取消关注
   */
  cancelAttention(){
    this.shareService.cancelAttention(this.userId).subscribe(res=>{
      if(res){
        this.toastsManager.success("取消关注成功","取关结果");
        this.card.attentionAble=true;
      }else{
        this.toastsManager.error("取消关注失败,请重试...","取关结果");
      }
    });
  }
  /**
   * 计算关注label
   */
  getAttentionLabel(){
    if(this.userId==this.homeService.homeInfo.userId||this.card.attentionAble){
      return "关注";
    }else{
      return "取关";
    }
  }

  /**
   * 计算卡片用户是不是自己
   * @return {boolean}
   */
  isMyself():boolean{
    return this.userId==this.homeService.homeInfo.userId;
  }
}
