import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginModule} from "./login/login.module";
import {MD_PLACEHOLDER_GLOBAL_OPTIONS} from "@angular/material";
import {ToastOptions} from "ng2-toastr";
import {BaseToastsOptions} from "./share/model/toasts-options.model";
import {HomeModule} from "./home/home.module";
import {NgProgressModule} from "ngx-progressbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PushNotificationsModule} from "angular2-notifications";


/**
 * 应用根模块
 *
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgProgressModule,BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    PushNotificationsModule
  ],
  providers: [
    /*弹出框全局配置*/
    {provide:ToastOptions,useClass:BaseToastsOptions},

    /*注入title服务*/
    Title,
    /*material2 Input组件placeholder自动浮动*/
    {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'never' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
