import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Regex} from "./model/regex.model";
import {RedFruitApi} from "./model/api.model";

import { FooterComponent } from './component/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './component/header/header.component';
import {RouterModule} from "@angular/router";
import {NavLink} from "./model/nav-link.model";
import {MdButtonModule, MdTabsModule, MdTooltipModule} from "@angular/material";

import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {RfEditorOptions} from "./model/rf-editor-options.model";
import { SigleMoodComponent } from './component/sigle-mood/sigle-mood.component';
import { ArtOperationComponent } from './component/art-operation/art-operation.component';
import { FaceComponent } from './component/face/face.component';
import {Face} from "./model/face.model";
import { UploadImgComponent } from './component/upload-img/upload-img.component';
import {LightboxModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MdButtonModule,
    MdTooltipModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),LightboxModule

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
    UploadImgComponent
  ],
  providers:[
    /*注入全局的api*/
    RedFruitApi,
    /*注入全局的ng2ToastOptions*/

    /*注入正则表达式模型*/
    Regex,
    /*注入导航模型*/
    NavLink,
    RfEditorOptions,
    Face
  ],
  declarations: [FooterComponent, HeaderComponent, SigleMoodComponent, ArtOperationComponent, FaceComponent, UploadImgComponent]
})
export class ShareModule { }
