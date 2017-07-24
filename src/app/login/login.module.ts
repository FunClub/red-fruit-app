import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import {NgProgressModule} from "ngx-progressbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule} from "@angular/material";
import 'hammerjs';
import {FormsModule} from "@angular/forms";
import {RegisterModule} from "../register/register.module";
import {ToastModule} from "ng2-toastr";
import {ShareModule} from "../share/share.module";
import {LoginService} from "./service/login.service";
import {RouterModule} from "@angular/router";

import { LoginBodyComponent } from './component/login-body/login-body.component';
import { InviteBodyComponent } from './component/invite-body/invite-body.component';
import {InviteGuard} from "./guard/invite.guard";
import {InviteSocketService} from "../websocket/socket/invite-socket.service";
import {InviteMessage} from "../websocket/model/invite-message.model";
import {InviteUser} from "./model/invite-user.model";

import { InviteMessageComponent } from './component/invite-message/invite-message.component';
@NgModule({
  imports: [
    RegisterModule,
    RouterModule,
    ShareModule,
    CommonModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    FormsModule,
    MdDialogModule,
    ToastModule.forRoot()
  ],
  exports:[

  ],
  providers:[
    /**
     * 登录服务
     */
    LoginService,
    /**
     * 保护邀请另一半组件
     */
    InviteGuard,

    /*邀请另一半的socket服务*/
    InviteSocketService,

    /**
     * 邀请另一半的消息模型
     */
    InviteMessage,
    /**
     * 登录到邀请另一半时的用户
     */
    InviteUser
  ],
  entryComponents:[InviteMessageComponent],
  declarations: [LoginComponent, LoginBodyComponent, InviteBodyComponent, InviteMessageComponent]
})
export class LoginModule { }
