import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleComponent } from './component/circle/circle.component';
import { CircleCenterComponent } from './component/circle-center/circle-center.component';
import {ShareModule} from "../share/share.module";
import { CircleArtCatalogComponent } from './component/circle-art-catalog/circle-art-catalog.component';
import {MdSlideToggleModule} from "@angular/material";
import { SingleCircleComponent } from './component/single-circle/single-circle.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import {CircleService} from "./service/circle.service";
import {CircleApi} from "./model/circle-api.model";
import {FroalaViewModule} from "angular-froala-wysiwyg";
import { PostComponent } from './component/post/post.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MdSlideToggleModule,
    FroalaViewModule.forRoot()
  ],
  entryComponents:[AddPostComponent],
  providers:[
    //圈子服务
    CircleService,

    //圈子api
    CircleApi,
  ],
  declarations: [CircleComponent, CircleCenterComponent, CircleArtCatalogComponent, SingleCircleComponent, AddPostComponent, PostComponent]
})
export class CircleModule { }
