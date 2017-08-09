import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootMarkComponent } from './component/foot-mark/foot-mark.component';
import {ShareModule} from "../share/share.module";
import { MyArtComponent } from './component/my-art/my-art.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule
  ],
  declarations: [FootMarkComponent, MyArtComponent]
})
export class FootMarkModule { }
