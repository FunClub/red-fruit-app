import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoteComponent} from "./component/note/note.component";
import {PersonCenterComponent} from "./component/person-center/person-center.component";
import { HomePageComponent } from './component/home-page/home-page.component';
import { MemoryDayComponent } from './component/memory-day/memory-day.component';
import { MoodComponent } from './component/mood/mood.component';
import { AlbumComponent } from './component/album/album.component';
import { LeaveMessageComponent } from './component/leave-message/leave-message.component';
import {PersonCenterService} from "./service/person-center.service";
import {ShareModule} from "../share/share.module";
import {
  MdButtonToggleModule,
  MdDialogModule, MdInputModule, MdMenuModule, MdPaginatorModule, MdRadioModule,
  MdSelectModule, MdSliderModule, MdSlideToggleModule
} from "@angular/material";
import {MoodService} from "./service/mood.service";
import {InsertMood} from "./model/mood/insert-mood";
import {PagedMood} from "./model/mood/paged-mood";
import {SingleAlbumComponent } from './component/album/single-album/single-album.component';
import { AddAlbumComponent } from './component/album/add-album/add-album.component';
import {AlbumService} from "./service/album.service";
import {AlbumApi} from "./model/base/album-api.model";
import { AddPhotoComponent } from './component/album/add-photo/add-photo.component';
import { WaterMarkComponent } from './component/album/water-mark/water-mark.component';
import {DndModule} from "ng2-dnd";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    MdMenuModule,
    MdPaginatorModule,
    MdDialogModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    DndModule,
    FroalaViewModule,
    FroalaEditorModule,
    MdSlideToggleModule,
    MdSliderModule
  ],
  declarations: [NoteComponent, PersonCenterComponent, HomePageComponent,
    MemoryDayComponent, MoodComponent, AlbumComponent, LeaveMessageComponent,
    SingleAlbumComponent, AddAlbumComponent, AddPhotoComponent, WaterMarkComponent],
  entryComponents:[
    AddAlbumComponent,
    AddPhotoComponent,
    WaterMarkComponent
  ],
  providers:[
    /*用户个人中心服务*/
    PersonCenterService,

    /*心情服务*/
    MoodService,

    /*插入心情的模型*/
    InsertMood,

    /*分页的心情模型*/
    PagedMood,

    /*相册服务*/
    AlbumService,

    /*相册API*/
    AlbumApi
  ]
})
export class PersonCenterModule { }
