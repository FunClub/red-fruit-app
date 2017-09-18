import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './component/email/email.component';
import { EmailListComponent } from './component/email-list/email-list.component';
import {ShareModule} from "../share/share.module";
import {MdCheckboxModule, MdDialogModule, MdInputModule, MdSlideToggleModule} from "@angular/material";
import { WriteEmailComponent } from './component/write-email/write-email.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {EmailApi} from "./model/email-api.model";
import {EmailService} from "./service/email.service";
import { SingleEmailComponent } from './component/single-email/single-email.component';
import { EmailAndCatalogComponent } from './component/email-and-catalog/email-and-catalog.component';


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
    EmailService
  ],
  declarations: [EmailComponent, EmailListComponent, WriteEmailComponent, SingleEmailComponent, EmailAndCatalogComponent]
})
export class EmailModule { }
