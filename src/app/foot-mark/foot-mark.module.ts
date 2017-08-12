import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootMarkComponent } from './component/foot-mark/foot-mark.component';
import {ShareModule} from "../share/share.module";
import { MyArtComponent } from './component/my-art/my-art.component';
import {MdPaginatorModule, MdSlideToggleModule} from "@angular/material";
import { SingleArtComponent } from './component/single-art/single-art.component';
import {NoticeArtService} from "./service/notice-art.service";

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MdSlideToggleModule,
    MdPaginatorModule
  ],
  providers:[
    NoticeArtService
  ],
  declarations: [FootMarkComponent, MyArtComponent, SingleArtComponent]
})
export class FootMarkModule { }
