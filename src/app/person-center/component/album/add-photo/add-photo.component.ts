import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog} from "@angular/material";
import {ShowAlbum} from "../../../model/album/show-album.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {WaterMarkComponent} from "../water-mark/water-mark.component";
import {BucketFolder} from "../../../../share/model/bucket-folder.model";
import {ImageUploadService} from "../../../../share/service/image-upload.service";
import {AlbumService} from "../../../service/album.service";
import {ShowUploadPhoto} from "../../../model/album/show-upload-photo.model";
import {AlbumApi} from "../../../model/base/album-api.model";
import {WaterMarkArgs} from "../../../model/album/water-mark-args";

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  uploadPhotoInfo:ShowUploadPhoto[];
  uploadSubscribe;
  constructor(@Inject(MD_DIALOG_DATA) public albums:ShowAlbum[],public api:RedFruitApi,public albumApi:AlbumApi,private dialog:MdDialog,
              private albumService:AlbumService,private imageService:ImageUploadService
  ) {
    this.uploadPhotoInfo=[];

  }
  ngOnInit() {
  }
  savePhoto(){
    console.log(this.uploadPhotoInfo);
  }
  deletePhoto(index:number){
    let path = this.uploadPhotoInfo[index].path;
    let paths:string[]=[];
    paths.push(path);
    this.uploadSubscribe=this.imageService.deleteImg(paths).subscribe(res=>{
      if(res){
        this.uploadPhotoInfo.splice(index,1);
      }
    });
  }
  /**
   * 关闭添加相片dialog
   * @param close
   */
  closeAddPhotoDialog(close:HTMLButtonElement,){
    close.click();
  }

  /**
   * 上传相片
   * @param event 文件上传事件
   */
  uploadPhoto(event){
    let files = event.target.files;
    this.uploadSubscribe=this.albumService.uploadPhoto(files).subscribe(res=>{
      this.uploadPhotoInfo =this.uploadPhotoInfo.concat(res);
    });
  }

  /**
   * 处理单张相片
   * @param index
   */
  addWaterMark(index:number){
    let waterMarkArgs = new WaterMarkArgs();
    waterMarkArgs.isBatch=false;
    waterMarkArgs.photos=this.uploadPhotoInfo;
    waterMarkArgs.currentIndex=index;
    this. openWaterMarkDialog(waterMarkArgs);
  }

  /**
   * 批量处理相片
   */
  addAllWaterMark(){
    let photo = new ShowUploadPhoto();
    photo.path="static/photo-default.jpg";
    photo.zoomSize=65;
    let waterMarkArgs = new WaterMarkArgs();
    waterMarkArgs.isBatch=true;
    waterMarkArgs.photo=photo;
    waterMarkArgs.photos = this.uploadPhotoInfo;
    this. openWaterMarkDialog(waterMarkArgs);
  }
  /**
   * 打开水印dialog
   */
  openWaterMarkDialog(args:WaterMarkArgs){
    this.dialog.open(WaterMarkComponent,{
      data:args,
      disableClose:true
    });
  }
}
