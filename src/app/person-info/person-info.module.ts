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
import {ImageCropperModule} from "ng2-img-cropper";
import {ProfileInfo} from "./model/profile-info";




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
    MdDialogModule,
    ImageCropperModule
  ],
  declarations: [PersonInfoComponent, BaseInfoComponent, PrivacySettingsComponent,UploadImgComponent],
  entryComponents:[
    //上传头像的组件
    UploadImgComponent
  ],

  providers:[
    //用户消息服务
    PersonInfoService,

    //用户的基本资料模型
    BaseInfo,

    //用户头像模型
    ProfileInfo
  ]

})
export class PersonInfoModule { }
