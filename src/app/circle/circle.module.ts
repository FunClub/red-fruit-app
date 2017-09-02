import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleComponent } from './component/circle/circle.component';
import { CircleCenterComponent } from './component/circle-center/circle-center.component';
import {ShareModule} from "../share/share.module";
import { CircleArtCatalogComponent } from './component/circle-art-catalog/circle-art-catalog.component';
import {MdSlideToggleModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    MdSlideToggleModule
  ],
  declarations: [CircleComponent, CircleCenterComponent, CircleArtCatalogComponent]
})
export class CircleModule { }
