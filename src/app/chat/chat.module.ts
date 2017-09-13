import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './component/chat/chat.component';
import {ShareModule} from "../share/share.module";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";

import {ChatService} from "./service/chat.service";
import {ChatApi} from "./component/model/chat-api.model";

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers:[
    ChatApi,
    ChatService
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
