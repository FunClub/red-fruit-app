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

@NgModule({
  imports: [
    CommonModule,
    ShareModule
  ],
  declarations: [NoteComponent, PersonCenterComponent, HomePageComponent, MemoryDayComponent, MoodComponent, AlbumComponent, LeaveMessageComponent],
  providers:[PersonCenterService]
})
export class PersonCenterModule { }
