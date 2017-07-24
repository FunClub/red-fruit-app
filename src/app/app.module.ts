import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginModule} from "./login/login.module";
import {BrowserXhr, HttpModule} from "@angular/http";
import {MD_PLACEHOLDER_GLOBAL_OPTIONS} from "@angular/material";
import {ToastOptions} from "ng2-toastr";
import {BaseToastsOptions} from "./share/model/toasts-options.model";
import {RedFruitApi} from "./share/model/api.model";
import {Regex} from "./share/model/regex.model";
import {HomeModule} from "./home/home.module";
import {PersonCenterModule} from "./person-center/person-center.module";
import {NgProgressModule} from "ngx-progressbar";
/**
 * 应用根模块
 *
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,   NgProgressModule,
    AppRoutingModule,
    LoginModule,
    HomeModule
  ],
  providers: [
    /*弹出框全局配置*/
    {provide:ToastOptions,useClass:BaseToastsOptions},

    /*注入title服务*/
    Title,
    /*material2 Input组件placeholder自动浮动*/
    {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'auto' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
