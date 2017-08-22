import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../../service/album.service";
import {ShowAlbumPhoto} from "../../../model/album/show-album-photo.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {AlbumApi} from "../../../model/base/album-api.model";
import {Photo} from "../../../model/album/add-photo.model";

@Component({
  selector: 'app-show-photos',
  templateUrl: './show-photos.component.html',
  styleUrls: ['./show-photos.component.css']
})
export class ShowPhotosComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170820000450-79863278123.JPG?x-oss-process=style/small-album-cover";
  photo="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170820000450-79863278123.JPG?x-oss-process=image/resize,m_fill,w_340,h_260,limit_0/auto-orient,1/quality,q_100";
  photo1="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170821000442652815920160925141201400409029QQ%E6%88%AA%E5%9B%BE20160925141102.png?x-oss-process=image/resize,m_fill,w_340,h_260,limit_0/auto-orient,1/quality,q_100"
  albumId:string;
  showAlbumPhoto:ShowAlbumPhoto;
  photos:Photo[];
  constructor(private activatedRoute:ActivatedRoute,private albumService:AlbumService,public api:RedFruitApi,
  public albumApi:AlbumApi
  ) {
   this.albumId=activatedRoute.snapshot.params['albumId'];
   this.photos=[];
  }

  ngOnInit() {
    this.albumService.selectPhotos(this.albumId).subscribe(res=>{
      this.showAlbumPhoto = res;
      this.photos=this.showAlbumPhoto.photos;
    });
  }

}
