import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecodeService} from "./service/recode.service";
import { ChatComponent } from './component/chat/chat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[RecodeService],
  declarations: [ChatComponent]
})
export class ChatModule { }
