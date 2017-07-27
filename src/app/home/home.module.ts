import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule} from "@angular/material";

import {PersonCenterModule} from "../person-center/person-center.module";
import {PersonInfoModule} from "../person-info/person-info.module";
import {HomeService} from "./service/home.service";
import {HomeGuard} from "./guard/home.guard";
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    PersonCenterModule,
    PersonInfoModule
  ],
  declarations: [HomeComponent],
  providers:[
    //home服务
    HomeService,
    //home守卫
    HomeGuard
  ]
})
export class HomeModule { }
