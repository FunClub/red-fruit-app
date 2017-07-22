import {Component, ElementRef, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {RedFruitApi} from "../../../share/model/api.model";
declare var $:any;
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
   * 路由是否激活的标志
   */
  activeLinkFlag:Array<boolean>;
  constructor(private title:Title, private toastsManager: ToastsManager,
              private vcr: ViewContainerRef, private toastOptions:ToastOptions) {
    this.toastsManager.setRootViewContainerRef(vcr);
    this.isNavOpen=true;
    this.activeLinkFlag=[true,false,false,false,false,false,false,false];
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
    if(!this.activeLinkFlag[index]){
      this.activeLinkFlag[index]=true;
      for(let i=0;i<this.activeLinkFlag.length;i++){
        if(i!=index){
          this.activeLinkFlag[i]=false;
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
