import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Regex} from "./model/regex.model";
import {RedFruitApi} from "./model/api.model";
import {ToastOptions} from "ng2-toastr";
import {BaseToastsOptions} from "./model/toasts-options.model";
import { FooterComponent } from './component/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './component/header/header.component';
import { HomeTabsComponent } from './component/home-tabs/home-tabs.component';
import {RouterModule} from "@angular/router";
import {NavLink} from "./model/nav-link.model";
import {MdTabsModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MdTabsModule
  ],
  exports:[FooterComponent,ReactiveFormsModule,HeaderComponent,HomeTabsComponent],
  providers:[
    /*注入全局的api*/
    RedFruitApi,
    /*注入全局的ng2ToastOptions*/

    /*注入正则表达式模型*/
    Regex,
    /*注入导航模型*/
    NavLink,
  ],
  declarations: [FooterComponent, HeaderComponent, HomeTabsComponent]
})
export class ShareModule { }
