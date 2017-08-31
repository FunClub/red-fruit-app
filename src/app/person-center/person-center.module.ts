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
  MdDialogModule, MdGridListModule, MdInputModule, MdMenuModule, MdPaginatorModule, MdRadioModule,
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
import { ShowPhotosComponent } from './component/album/show-photos/show-photos.component';
import { ShowAlbumComponent } from './component/album/show-album/show-album.component';
import { EditPhotoInfoComponent } from './component/album/show-photos/edit-photo-info/edit-photo-info.component';
import { MovePhotoComponent } from './component/album/show-photos/move-photo/move-photo.component';
import { ShowOnePhotoComponent } from './component/album/show-photos/show-one-photo/show-one-photo.component';
import {NoteService} from "./service/note.service";
import {NoteApi} from "./model/note/note-api.model";
import { AddNoteComponent } from './component/note/add-note/add-note.component';
import { CatalogNoteListComponent } from './component/note/catalog-note-list/catalog-note-list.component';
import {SingleCatalogNoteComponent} from "./component/note/single-catalog-note/single-catalog-note.component";
import {SingleNoteComponent} from "./component/note/single-note/single-note.component";
import { PreviewNoteComponent } from './component/note/preview-note/preview-note.component';
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
    MdSliderModule,
    MdGridListModule
  ],
  declarations: [NoteComponent, PersonCenterComponent, HomePageComponent,
    MemoryDayComponent, MoodComponent, AlbumComponent, LeaveMessageComponent,
    SingleAlbumComponent, AddAlbumComponent, AddPhotoComponent, WaterMarkComponent,
    ShowPhotosComponent, ShowAlbumComponent, EditPhotoInfoComponent, MovePhotoComponent, ShowOnePhotoComponent,
    AddNoteComponent, CatalogNoteListComponent,SingleCatalogNoteComponent,SingleNoteComponent, PreviewNoteComponent],
  entryComponents:[
    AddAlbumComponent,
    AddPhotoComponent,
    WaterMarkComponent,
    EditPhotoInfoComponent,
    MovePhotoComponent,
    ShowOnePhotoComponent,
    AddNoteComponent,
    PreviewNoteComponent
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
    AlbumApi,

    /*日志服务*/
    NoteService,

    /*日志api*/
    NoteApi
  ]
})
export class PersonCenterModule { }
