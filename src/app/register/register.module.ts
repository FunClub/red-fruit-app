import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './component/register/register.component';
import {
  MdButtonModule, MdDatepickerModule, MdDialogModule, MdInputModule, MdNativeDateModule, MdProgressBarModule,
  MdRadioModule,
  MdSelectModule,
  MdSlideToggleModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RegisterService} from "./service/register.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    MdDatepickerModule,MdNativeDateModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdRadioModule
  ],
  providers:[
    /*注册注册模块服务*/
    RegisterService
  ],
  entryComponents:[RegisterComponent],
  exports:[RegisterComponent],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
