import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Regex} from "./model/regex.model";
import {RedFruitApi} from "./model/base/api.model";

import { FooterComponent } from './component/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './component/header/header.component';
import {RouterModule} from "@angular/router";
import {NavLink} from "./model/nav-link.model";
import {MdButtonModule, MdInputModule, MdTabsModule, MdTooltipModule} from "@angular/material";

import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {RfEditorOptions} from "./model/rf-editor-options.model";
import { SigleMoodComponent } from './component/sigle-mood/sigle-mood.component';
import { ArtOperationComponent } from './component/art-operation/art-operation.component';
import { FaceComponent } from './component/face/face.component';
import {Face} from "./model/face.model";
import { UploadImgComponent } from './component/upload-img/upload-img.component';
import {ImageUploadService} from "./service/image-upload.service";
import {DndModule} from "ng2-dnd";
import {BusyConfig, BusyModule} from "angular2-busy";
import {HttpModule} from "@angular/http";
import {ShowMoodImg} from "./model/show-mood-img";
import { ArtDiscussionComponent } from './component/art-discussion/art-discussion.component';
import {BucketFolder} from "./model/bucket-folder.model";
import {SendDiscussion} from "./model/discussion/send-discussion.model";
import {DiscussionService} from "./service/discussion.service";
import {SelectDiscussion} from "./model/discussion/select-discussion";
import {ShowPagedDiscussion} from "./model/discussion/show-paged-discussion.model";
import {ArtType} from "./model/art-opreation/art-type.model";



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdInputModule,
    ReactiveFormsModule,
    RouterModule,
    MdButtonModule,
    MdTooltipModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    DndModule.forRoot(),
    BusyModule
  ],
  exports:[FooterComponent,ReactiveFormsModule,HeaderComponent,  ReactiveFormsModule,
    RouterModule,
    MdTabsModule,
    FroalaViewModule,
    FroalaEditorModule,
    SigleMoodComponent,
    ArtOperationComponent,
    MdTooltipModule,
    MdButtonModule,
    FaceComponent,
    UploadImgComponent,
    ArtDiscussionComponent
  ],
  providers:[
    /*注入全局的api*/
    RedFruitApi,
    /*注入全局的ng2ToastOptions*/

    /*注入正则表达式模型*/
    Regex,
    /*注入导航模型*/
    NavLink,
    /*表情模型*/
    Face,

    RfEditorOptions,
    /*图片上传服务*/
    ImageUploadService,

    /*显示图片参数的模型*/
    ShowMoodImg,
    /**
     * oss 文件夹名
     */
    BucketFolder,

    /*发送评论的模型*/
    SendDiscussion,

    /*评论服务*/
    DiscussionService,
    /**
     * 查询评论时的条件模型
     */
    SelectDiscussion,

    /*显示分好页的评论模型*/
    ShowPagedDiscussion,

    /*动态类型*/
    ArtType
  ],
  declarations: [FooterComponent, HeaderComponent, SigleMoodComponent, ArtOperationComponent, FaceComponent, UploadImgComponent, ArtDiscussionComponent]
})
export class ShareModule { }
