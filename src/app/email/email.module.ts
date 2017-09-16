import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './component/email/email.component';
import { EmailListComponent } from './component/email-list/email-list.component';
import {ShareModule} from "../share/share.module";
import {MdCheckboxModule, MdSlideToggleModule} from "@angular/material";
import { WriteEmailComponent } from './component/write-email/write-email.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MdSlideToggleModule,
    MdCheckboxModule
  ],
  declarations: [EmailComponent, EmailListComponent, WriteEmailComponent]
})
export class EmailModule { }
