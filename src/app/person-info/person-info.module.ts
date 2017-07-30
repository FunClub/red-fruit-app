import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonInfoComponent } from './component/person-info/person-info.component';
import { BaseInfoComponent } from './component/base-info/base-info.component';
import {PrivacySettingsComponent} from "./component/privacy-settings/privacy-settings.component";
import {ShareModule} from "../share/share.module";
import {
  MdButtonModule, MdDatepickerModule, MdDialogModule, MdInputModule, MdRadioModule, MdSelectModule,
  MdTabsModule,
} from "@angular/material";
import {PersonInfoService} from "./person-info.service";
import {BaseInfo} from "./model/base-info";
import {UploadImgComponent} from "./component/upload-img/upload-img.component";
import {ImageCropperComponent} from "ng2-img-cropper";



@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MdTabsModule,
    MdInputModule,
    MdDatepickerModule,
    MdSelectModule,
    MdButtonModule,
    MdRadioModule,
    MdDialogModule
  ],
  declarations: [PersonInfoComponent, BaseInfoComponent, PrivacySettingsComponent,UploadImgComponent, ImageCropperComponent],
  entryComponents:[
    //上传头像的组件
    UploadImgComponent
  ],

  providers:[
    //用户消息服务
    PersonInfoService,

    //用户的基本资料模型
    BaseInfo
  ]

})
export class PersonInfoModule { }
