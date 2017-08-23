import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {MovePhotoArgs} from "../../../../model/album/move-photo.model";
import {ShowAlbum} from "../../../../model/album/show-album.model";
import {RedFruitApi} from "../../../../../share/model/base/api.model";
import {AlbumApi} from "../../../../model/base/album-api.model";

@Component({
  selector: 'app-move-photo',
  templateUrl: './move-photo.component.html',
  styleUrls: ['./move-photo.component.css']
})
export class MovePhotoComponent implements OnInit {
  /**
   * 相册数组
   */
  albums:ShowAlbum[];
  img:string="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170823134418228505152201609251115541116270561IMG_2612.JPG?x-oss-process=style/small-album-cover"
  constructor(@Inject(MD_DIALOG_DATA)private movePhotoArgs:MovePhotoArgs,public  api:RedFruitApi,public albumApi:AlbumApi) {
    this.albums=movePhotoArgs.albums;
  }

  ngOnInit() {
  }

}
