import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule, MdTabsModule} from "@angular/material";
import {ShareModule} from "../share/share.module";
import {BaseToastsOptions} from "../share/model/toasts-options.model";
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdTabsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
