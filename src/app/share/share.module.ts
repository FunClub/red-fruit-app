import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Regex} from "./model/regex.model";
import {RedFruitApi} from "./model/api.model";

import { FooterComponent } from './component/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './component/header/header.component';
import {RouterModule} from "@angular/router";
import {NavLink} from "./model/nav-link.model";
import {MdTabsModule} from "@angular/material";
import { RedFruitEditorComponent } from './component/red-fruit-editor/red-fruit-editor.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {RfEditorOptions} from "./model/rf-editor-options.model";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports:[FooterComponent,ReactiveFormsModule,HeaderComponent,  ReactiveFormsModule,
    RouterModule,
    MdTabsModule,
    RedFruitEditorComponent,
    FroalaViewModule,FroalaEditorModule
  ],
  providers:[
    /*注入全局的api*/
    RedFruitApi,
    /*注入全局的ng2ToastOptions*/

    /*注入正则表达式模型*/
    Regex,
    /*注入导航模型*/
    NavLink,
    RfEditorOptions
  ],
  declarations: [FooterComponent, HeaderComponent, RedFruitEditorComponent]
})
export class ShareModule { }
