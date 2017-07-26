import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./component/home/home.component";
import {PersonCenterComponent} from "../person-center/component/person-center/person-center.component";
import {NoteComponent} from "../person-center/component/note/note.component";
import {HomePageComponent} from "../person-center/component/home-page/home-page.component";
import {MemoryDayComponent} from "../person-center/component/memory-day/memory-day.component";
import {MoodComponent} from "../person-center/component/mood/mood.component";
import {AlbumComponent} from "../person-center/component/album/album.component";
import {LeaveMessageComponent} from "../person-center/component/leave-message/leave-message.component";
import {PersonInfoComponent} from "../person-info/component/person-info/person-info.component";
import {BaseInfoComponent} from "../person-info/component/base-info/base-info.component";
import {PrivacySettingsComponent} from "../person-info/component/privacy-settings/privacy-settings.component";
const  homeRoutes:Routes=[
  {
    path:'',
    component:HomeComponent,
    children:[
      /*个人中心*/
      {
        path:'person-center',
        component:PersonCenterComponent,
        children:
        [
          {path:'home-page',component:HomePageComponent},
          {path:'mood',component:MoodComponent},
          {path:'memory-day',component:MemoryDayComponent},
          {path:'note',component:NoteComponent},
          {path:'album',component:AlbumComponent},
          {path:'leave-message',component:LeaveMessageComponent},
          {path:'',redirectTo:'home-page',pathMatch:'full'}
        ]
      },

      /*个人资料*/
      {
        path:'person-info',
        component:PersonInfoComponent,
        children:[
          {path:'base-info',component:BaseInfoComponent},
          {path:'privacy-settings',component:PrivacySettingsComponent},
          {path:'',redirectTo:"base-info",pathMatch:'full'}
        ]
      },
      {path:'',redirectTo:"person-center",pathMatch:'full'}

      /*....*/
    ]
  },

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class HomeRoutingModule { }
