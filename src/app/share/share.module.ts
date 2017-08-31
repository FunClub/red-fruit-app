import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Regex} from "./model/regex.model";
import {RedFruitApi} from "./model/base/api.model";

import { FooterComponent } from './component/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './component/header/header.component';
import {RouterModule} from "@angular/router";
import {NavLink} from "./model/base/nav-link.model";
import {
  MdButtonModule, MdDialogModule, MdInputModule, MdMenuModule, MdPaginatorModule, MdTabsModule,
  MdTooltipModule
} from "@angular/material";

import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {RfEditorOptions} from "./model/base/rf-editor-options.model";
import { SigleMoodComponent } from './component/sigle-mood/sigle-mood.component';
import { ArtOperationComponent } from './component/art-operation/art-operation.component';
import { FaceComponent } from './component/face/face.component';
import {Face} from "./model/base/face.model";
import { UploadImgComponent } from './component/upload-img/upload-img.component';
import {ImageUploadService} from "./service/image-upload.service";
import {DndModule} from "ng2-dnd";
import {BusyModule} from "angular2-busy";
import {HttpModule} from "@angular/http";
import {ShowMoodImg} from "./model/show-mood-img";
import { ArtDiscussionComponent } from './component/art-discussion/art-discussion.component';
import {BucketFolder} from "./model/base/bucket-folder.model";
import {InsertDiscussion} from "./model/discussion/insert-discussion.model";
import {DiscussionService} from "./service/discussion.service";
import {ShowPagedDiscussion} from "./model/discussion/show-paged-discussion.model";
import {ArtType} from "../foot-mark/model/art-type.model";
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ReplyDiscussionComponent } from './component/reply-discussion/reply-discussion.component';
import {RefreshDiscussion} from "./model/discussion/refresh-discussion.model";
import { MoreDiscussionComponent } from './component/more-discussion/more-discussion.component';
import { OpenMoreDiscussionComponent } from './component/open-more-discussion/open-more-discussion.component';
import {NoticeArtType} from "../foot-mark/model/notice-art-type";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MdButtonModule,
    MdDialogModule,
    MdTooltipModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    DndModule.forRoot(),
    BusyModule,
    MdPaginatorModule,
    MdMenuModule
  ],
  exports:[FooterComponent,HeaderComponent,  ReactiveFormsModule,FormsModule,
    RouterModule,
    MdTabsModule,
    SigleMoodComponent,
    ArtOperationComponent,
    MdTooltipModule,
    MdButtonModule,
    FaceComponent,
    UploadImgComponent,
    ArtDiscussionComponent,
    OpenMoreDiscussionComponent,
    ReplyDiscussionComponent,
    SafeHtmlPipe,
    BusyModule,
    MdMenuModule
  ],
  entryComponents:[MoreDiscussionComponent],
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

    /*插入评论的模型*/
    InsertDiscussion,

    /*评论服务*/
    DiscussionService,

    /*显示分好页的评论模型*/
    ShowPagedDiscussion,

    /*动态类型*/
    ArtType,

    /*刷新父级评论*/
    RefreshDiscussion,

    /*通知动态类型*/
    NoticeArtType
    ],
  declarations: [FooterComponent, HeaderComponent, SigleMoodComponent, ArtOperationComponent,
    FaceComponent, UploadImgComponent, ArtDiscussionComponent, SafeHtmlPipe, ReplyDiscussionComponent,
    MoreDiscussionComponent, OpenMoreDiscussionComponent]
})
export class ShareModule { }
