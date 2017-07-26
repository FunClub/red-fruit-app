import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonInfoComponent } from './component/person-info/person-info.component';
import { BaseInfoComponent } from './component/base-info/base-info.component';
import {PrivacySettingsComponent} from "./component/privacy-settings/privacy-settings.component";
import {ShareModule} from "../share/share.module";
import {RouterModule} from "@angular/router";
import {
  MdButtonModule, MdDatepickerModule, MdInputModule, MdRadioModule, MdSelectModule,
  MdTabsModule, MdTooltipModule
} from "@angular/material";
import {PersonInfoService} from "./person-info.service";
import {BaseInfo} from "./model/base-info";



@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MdInputModule,
    MdDatepickerModule,
    MdSelectModule,
    MdButtonModule,
    MdRadioModule,
    MdTooltipModule
  ],
  declarations: [PersonInfoComponent, BaseInfoComponent, PrivacySettingsComponent],
  providers:[PersonInfoService,BaseInfo]
})
export class PersonInfoModule { }
