import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './component/email/email.component';
import { EmailListComponent } from './component/email-list/email-list.component';
import {ShareModule} from "../share/share.module";
import {MdCheckboxModule, MdDialogModule, MdInputModule, MdSlideToggleModule} from "@angular/material";
import { WriteEmailComponent } from './component/write-email/write-email.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {EmailApi} from "./model/email-api.model";


@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MdSlideToggleModule,
    MdCheckboxModule,
    MdDialogModule,
    MdInputModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers:[
    /*邮件api*/
    EmailApi,
    /*邮件服务*/
  ],
  declarations: [EmailComponent, EmailListComponent, WriteEmailComponent]
})
export class EmailModule { }
