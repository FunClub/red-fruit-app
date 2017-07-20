import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoteComponent} from "./component/note/note.component";
import {PersonCenterComponent} from "./component/person-center/person-center.component";
import {RouterModule} from "@angular/router";
import {MdTabsModule} from "@angular/material";
import { HomePageComponent } from './component/home-page/home-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdTabsModule
  ],
  declarations: [NoteComponent, PersonCenterComponent, HomePageComponent]
})
export class PersonCenterModule { }
