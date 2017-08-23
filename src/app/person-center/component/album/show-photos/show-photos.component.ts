import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../../service/album.service";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {AlbumApi} from "../../../model/base/album-api.model";
import {Photo, ShowAddPhotoDialogArgs} from "../../../model/album/add-photo.model";
import {ShowAlbum, ShowAlbumPhoto} from "../../../model/album/show-album.model";
import {MdDialog} from "@angular/material";
import {AddPhotoComponent} from "../add-photo/add-photo.component";

@Component({
  selector: 'app-show-photos',
  templateUrl: './show-photos.component.html',
  styleUrls: ['./show-photos.component.css']
})
export class ShowPhotosComponent implements OnInit {
  /**
   * 相册id
   */
  albumId:string;
  /**
   * 显示一个相册及其相片的模型
   */
  showAlbumPhoto:ShowAlbumPhoto;

  /**
   * 相片数组
   */
  photos:Photo[];

  /**
   * 当前相册信息
   */
  currentAlbum:ShowAlbum;

  /**
   * 相册信息数组
   */
  albums:ShowAlbum[];

  /**
   * 显示添加相片的dialog参数模型
   */
  addPhotoArgs:ShowAddPhotoDialogArgs;
  constructor(private activatedRoute:ActivatedRoute,private albumService:AlbumService,public api:RedFruitApi,
  public albumApi:AlbumApi,private dialog:MdDialog
  ) {
   this.albumId=activatedRoute.snapshot.params['albumId'];
   this.photos=[];
   this.currentAlbum = new ShowAlbum();
   this.addPhotoArgs = new ShowAddPhotoDialogArgs();
   this.addPhotoArgs.currentAlbumId=this.albumId;
  }

  ngOnInit() {
    this.selectPhoto();
  }
  selectPhoto(){
    this.albumService.selectPhotos(this.albumId).subscribe(res=>{
      this.showAlbumPhoto = res;
      this.photos=this.showAlbumPhoto.photos;
      this.albums = this.showAlbumPhoto.albums;
      this.currentAlbum = this.showAlbumPhoto.currentAlbum;
      this.addPhotoArgs.albums=this.albums;
    });
  }
  addPhoto(){
    this.dialog.open(AddPhotoComponent,{
      panelClass:'add-photo-panel',
      disableClose:true,
      data:this.addPhotoArgs
    }).afterClosed().subscribe(res=>{
      if(res){//如果保存了相片就更新相片信息
        this.photos=this.addPhotoArgs.addedPhotos.concat(this.photos);
      }
    });
  }
}
