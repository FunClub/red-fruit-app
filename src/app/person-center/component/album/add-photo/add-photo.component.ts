import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog} from "@angular/material";
import {ShowAlbum} from "../../../model/album/show-album.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {WaterMarkComponent} from "../water-mark/water-mark.component";
import {ImageUploadService} from "../../../../share/service/image-upload.service";
import {AlbumService} from "../../../service/album.service";
import {AlbumApi} from "../../../model/base/album-api.model";
import {WaterMarkArgs} from "../../../model/album/water-mark-args.model";
import {AddPhoto, Photo, ShowAddPhotoDialogArgs} from "../../../model/album/add-photo.model";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  /**
   * 上传的图片信息
   */
  uploadPhotoInfo:Photo[];
  /**
   * 添加到后台的相片数据
   */
  addPhotoInfo:AddPhoto;
  /**
   * 订阅
   */
  uploadSubscribe;

  /**
   * 是否保存了相片；
   */
  photoSaved:boolean;
  constructor(@Inject(MD_DIALOG_DATA)public addPhotoArgs:ShowAddPhotoDialogArgs,public api:RedFruitApi,public albumApi:AlbumApi,private dialog:MdDialog,
              private albumService:AlbumService,private imageService:ImageUploadService,private toastsManager:ToastsManager,private router:Router,

  ) {
    this.uploadPhotoInfo=[];
    this.addPhotoInfo = new AddPhoto();
    this.addPhotoInfo.quality=60;
    this.addPhotoInfo.albumId = addPhotoArgs.currentAlbumId;
    this.photoSaved=false;
    window.onresize = () => {}
  }
  ngOnInit() {

  }
  getPhotoColumn(){
    let width = window.innerWidth*0.8;
    let column=Math.floor(width/140);
    console.log(column)
    return column;
  }
  /**
   * 保存上传的相片
   * @param close
   */
  savePhoto(close:HTMLButtonElement){
    this.photoSaved=true;
    this.uploadSubscribe=this.albumService.save(this.addPhotoInfo,this.uploadPhotoInfo).subscribe(res=>{
      if(res.code==200){
        this.addPhotoArgs.addedPhotos=res.data;
        close.click();
        this.router.navigate(["home/person-center/album/photos",this.addPhotoInfo.albumId])
      }else{
        this.toastsManager.error("相片添加失败,请重试...","添加结果");
      }
    })
  }

  /**
   * 清空相片
   */
  clearPhoto(){
    this.uploadSubscribe=this.imageService.clearImg(this.uploadPhotoInfo).subscribe(res=>{
      if(res){
        this.uploadPhotoInfo=[];
      }
    });
  }

  /**
   * 删除相片
   * @param index
   */
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
    if(this.uploadPhotoInfo.length>0){
      this.uploadSubscribe=this.imageService.clearImg(this.uploadPhotoInfo).subscribe(res=>{
        if(res){
          this.uploadPhotoInfo=[];
          close.click();
        }
      });
    }else{
      close.click();
    }


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
    let photo = new Photo();
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
