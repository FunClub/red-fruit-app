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
@NgModule({
  imports: [
    RegisterModule,
    RouterModule,
    ShareModule,
    CommonModule,
    NgProgressModule,
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

    LoginService,
    /**
     * 保护邀请另一半组件
     */
    InviteGuard
    ],
  declarations: [LoginComponent, LoginBodyComponent, InviteBodyComponent]
})
export class LoginModule { }
