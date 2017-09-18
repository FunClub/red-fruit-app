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
import {HomeGuard} from "./guard/home.guard";
import {FootMarkComponent} from "../foot-mark/component/foot-mark/foot-mark.component";
import {MyArtComponent} from "../foot-mark/component/my-art/my-art.component";
import {ShowPhotosComponent} from "../person-center/component/album/show-photos/show-photos.component";
import {ShowAlbumComponent} from "../person-center/component/album/show-album/show-album.component";
import {CatalogNoteListComponent} from "../person-center/component/note/catalog-note-list/catalog-note-list.component";
import {SingleNoteComponent} from "../person-center/component/note/single-note/single-note.component";
import {ChatComponent} from "../chat/component/chat/chat.component";
import {CircleComponent} from "../circle/component/circle/circle.component";
import {CircleCenterComponent} from "../circle/component/circle-center/circle-center.component";
import {SingleCircleComponent} from "../circle/component/single-circle/single-circle.component";
import {PostComponent} from "../circle/component/post/post.component";
import {EmailComponent} from "../email/component/email/email.component";
import {EmailListComponent} from "../email/component/email-list/email-list.component";
import {WriteEmailComponent} from "../email/component/write-email/write-email.component";
import {SingleEmailComponent} from "../email/component/single-email/single-email.component";
import {EmailAndCatalogComponent} from "../email/component/email-and-catalog/email-and-catalog.component";
const  homeRoutes:Routes=[
  {
    path:'',
    component:HomeComponent,
    canActivate:[HomeGuard],
    children:[
      /*个人中心*/
      {
        path:'person-center',
        component:PersonCenterComponent,
        children: [
          {path:'home-page',component:HomePageComponent},
          {path:'mood',component:MoodComponent},
          {path:'memory-day',component:MemoryDayComponent},
          {
            path:'note',
            component:NoteComponent,
            children:[
              {path:'',component:CatalogNoteListComponent},
              {path:':noteId',component:SingleNoteComponent}
            ]
          },
          {
            path:'album',
            component:AlbumComponent,
            children:[
              {path:'',component:ShowAlbumComponent},
              {path:'photos/:albumId',component:ShowPhotosComponent}
            ]
          },
          {path:'leave-message',component:LeaveMessageComponent},
          {path:'',redirectTo:'home-page',pathMatch:'full'}
        ]
      },
      /*足迹*/
      {
        path:'foot-mark',
        component:FootMarkComponent,
        children:[
          {path:'my-art',component:MyArtComponent},
          {path:'',redirectTo:'my-art',pathMatch:'full'}
        ]
      },
      /*聊天*/
      {
        path:'chat',
        component:ChatComponent
      },
      /*邮件*/
      {
        path:'email',component:EmailComponent,
        children:[
          {
            path:'email-list',component:EmailAndCatalogComponent,
            children:[
              {path:'',component:EmailListComponent},
              {path:'single-email/:emailId',component:SingleEmailComponent},
            ]
          },
          {path:'write-email',component:WriteEmailComponent},
          {path:'',redirectTo:"email-list",pathMatch:'full'}
        ]
      },
      /*圈子*/
      {
        path:'circle-center',
        component:CircleComponent,
        children:[
          {path:'',component:CircleCenterComponent},
          {path:'circle/:circleIndex',component:SingleCircleComponent},
          {path:'post/:postId',component:PostComponent},

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
