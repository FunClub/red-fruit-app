import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule, MdTabsModule} from "@angular/material";
import {ShareModule} from "../share/share.module";
import {BaseToastsOptions} from "../share/model/toasts-options.model";
import {PersonCenterModule} from "../person-center/person-center.module";
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    PersonCenterModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
