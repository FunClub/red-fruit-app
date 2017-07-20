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
import {BaseToastsOptions} from "../share/model/toasts-options.model";
import {ToastOptions} from "_ng2-toastr@4.1.2@ng2-toastr/src/toast-options";
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
  providers:[ LoginService,/*注入全局的ng2ToastOptions*/
    ],
  declarations: [LoginComponent]
})
export class LoginModule { }
