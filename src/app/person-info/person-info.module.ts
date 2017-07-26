import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonInfoComponent } from './component/person-info/person-info.component';
import { BaseInfoComponent } from './component/base-info/base-info.component';
import {PrivacySettingsComponent} from "./component/privacy-settings/privacy-settings.component";
import {ShareModule} from "../share/share.module";
import {RouterModule} from "@angular/router";
import {MdTabsModule} from "@angular/material";



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdTabsModule
  ],
  declarations: [PersonInfoComponent, BaseInfoComponent, PrivacySettingsComponent]
})
export class PersonInfoModule { }
