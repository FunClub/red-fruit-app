import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule} from "@angular/material";

import {PersonCenterModule} from "../person-center/person-center.module";
import {PersonInfoModule} from "../person-info/person-info.module";
import {HomeService} from "./service/home.service";
import {HomeGuard} from "./guard/home.guard";
import {Home} from "./model/home.model";
import {FootMarkModule} from "../foot-mark/foot-mark.module";
import {NoticeMessage} from "../websocket/model/notice-message.model";
import {BaseSocketService} from "../websocket/socket/base-socket.service";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    PersonCenterModule,
    PersonInfoModule,
    FootMarkModule
  ],
  declarations: [HomeComponent],
  providers:[
    //home服务
    HomeService,
    //home守卫
    HomeGuard,
    /*主页模型*/
    Home,

    /*SOCKET服务*/
    BaseSocketService,

    /*消息通知数据*/
    NoticeMessage
  ]
})
export class HomeModule { }
