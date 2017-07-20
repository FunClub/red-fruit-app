import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./component/home/home.component";
import {PersonCenterComponent} from "../person-center/component/person-center/person-center.component";
import {NoteComponent} from "../person-center/component/note/note.component";
import {HomePageComponent} from "../person-center/component/home-page/home-page.component";
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
          {path:'note',component:NoteComponent},
          {path:'',redirectTo:'home-page',pathMatch:'full'}
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
