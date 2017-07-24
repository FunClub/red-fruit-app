import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule} from "@angular/material";

import {PersonCenterModule} from "../person-center/person-center.module";
import {PersonInfoModule} from "../person-info/person-info.module";
import {HomeService} from "./service/home.service";
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
    HomeService
  ]
})
export class HomeModule { }
