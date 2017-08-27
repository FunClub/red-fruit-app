import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {MovePhoto, MovePhotoArgs} from "../../../../model/album/move-photo.model";
import {ShowAlbum} from "../../../../model/album/show-album.model";
import {RedFruitApi} from "../../../../../share/model/base/api.model";
import {AlbumApi} from "../../../../model/base/album-api.model";
import {AlbumService} from "../../../../service/album.service";
import {ToastsManager} from "ng2-toastr";

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

  /**
   *目标相册id
   */
  tartGetAlbumId:string;
  /**
   * 选择相册标志
   */
  selectFlag:boolean[];
  movePhotoSubscribe:any;
  constructor(@Inject(MD_DIALOG_DATA)private movePhotoArgs:MovePhotoArgs,public  api:RedFruitApi,public albumApi:AlbumApi,
  private albumService:AlbumService,private toastsManager:ToastsManager
  ) {
    console.log(movePhotoArgs)
    this.albums=movePhotoArgs.albums;
    this.selectFlag=[];
  }

  /**
   * 选定相册
   * @param index
   */
  selectAlbum(index:number){
    if(!this.selectFlag[index]){
      this.selectFlag[index]=true;
      this.tartGetAlbumId=this.albums[index].albumId;
      for(let i=0;i<this.selectFlag.length;i++){
        if(this.selectFlag[i]&&i!=index){
          this.selectFlag[i]=false;
          break;
        }
      }
    }
  }
  ngOnInit() {
    for (let i=0;i<this.movePhotoArgs.albums.length;i++){
      this.selectFlag.push(false);
    }
  }

  /**
   * 移动到其他相册
   * @param close
   */
  moveAlbumPhoto(close:HTMLButtonElement){
    let movePhoto = new MovePhoto();
    movePhoto.tarGetAlbumId=this.tartGetAlbumId;
    movePhoto.movedAlbumId=this.movePhotoArgs.movedAlbumId;
    movePhoto.photoIds=this.movePhotoArgs.photoIds;
    this.movePhotoSubscribe=this.albumService.moveAlbumPhoto(movePhoto).subscribe(res=>{
      if(res){
        this.toastsManager.success("相片移动成功","移动结果");
        this.removePhotoFormAlbum();
        close.click();
      }else{

        this.toastsManager.error("相片移动失败,请重试...","移动结果");
      }
    });
  }

  /**
   * 把相片从相册中移除
   */
  removePhotoFormAlbum(){
    for(let index of this.movePhotoArgs.photoIdIndex){
      this.movePhotoArgs.photos.splice(index,1);
    }
  }

}
