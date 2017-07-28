import {Component, ElementRef, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {RedFruitApi} from "../../../share/model/api.model";
import {HomeService} from "../../service/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   * 导航面板是否打开，默认是true
   */
  isNavOpen:boolean;
  /**
   * 路由信息数据
   */

  routerLinks:Array<any>;
  constructor(private title:Title, private toastsManager: ToastsManager,
              private vcr: ViewContainerRef, private toastOptions:ToastOptions,
              private homeService:HomeService

  ) {
    this.toastsManager.setRootViewContainerRef(vcr);
    this.isNavOpen=true;
    this.routerLinks=[
      {path:'person-center/home-page','label':'我的主页','isActive':true,'ico':'dashboard'},
      {path:'person-center/home-page','label':'点滴足迹','isActive':false,'ico':'grade'},
      {path:'person-center/home-page','label':'浪漫密聊','isActive':false,'ico':'forum'},
      {path:'person-center/home-page','label':'飞鸽传书','isActive':false,'ico':'email'},
      {path:'person-center/home-page','label':'红果密圈','isActive':false,'ico':'group_work'},
      {path:'person-center/home-page','label':'分享圈子','isActive':false,'ico':'shop_two'},
      {path:'person-center/home-page','label':'幸福之墙','isActive':false,'ico':'loyalty'},
      {path:'person-info','label':'资料设置','isActive':false,'ico':'settings_applications'}
    ];
  }

  ngOnInit() {


    this.title.setTitle("红果-主页")
  }
  top(){


  }

  /**
   *改变路由激活的标志
   */
  changeActiveLink(index:number){
    if(!this.routerLinks[index].isActive){
      this.routerLinks[index].isActive=true;
      for(let i=0;i<this.routerLinks.length;i++){
        if(i!=index){
          this.routerLinks[i].isActive=false;
        }
      }
    }

  }
  /**
   *打开导航面板
   */
  openNav(nav:any){
   this.isNavOpen=!this.isNavOpen;
    nav.toggle();
  }

  /**
   * 解决导航滑动第一次失效的bug
   */
  killnNavToggleBug(){/*do no thing...*/}
}
