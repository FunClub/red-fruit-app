import {Component, Inject, OnInit} from '@angular/core';
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {HomeService} from "../../../../home/service/home.service";
import {AlbumService} from "../../../service/album.service";
import {ShowUploadPhoto} from "../../../model/album/show-upload-photo.model";
import {MD_DIALOG_DATA} from "@angular/material";
import {WaterMarkArgs} from "../../../model/album/water-mark-args";

@Component({
  selector: 'app-water-mark',
  templateUrl: './water-mark.component.html',
  styleUrls: ['./water-mark.component.css']
})
export class WaterMarkComponent implements OnInit {
  zoomOutArgs:string;
  zoomInArgs:string;

  zoomInFontSize:string;
  zoomOutFontSize:string;

  zoomOutWaterArgs:string;
  zoomInWaterArgs:string;

  base64UrlName:string;
  photoBaeArgs:string;
  fontSize:string;
  waterMarkArgs:string;
  effectArgs:string;
  /**
   * 是否显示水印视图
   */
  waterMarkView:boolean;

  /**
   * 是否添加水印
   */
  addWaterMark:boolean;

  /**
   * 零时相片模型
   */
  tempPhoto:ShowUploadPhoto;

  /**
   * 当前正在显示的照片
   */
  photo:ShowUploadPhoto;

  /**
   * 相册数组
   */
  photos:ShowUploadPhoto[];

  currentIndex:number;
  constructor(@Inject(MD_DIALOG_DATA)public photoInfo:WaterMarkArgs, public api:RedFruitApi,
              private homeService:HomeService,private albumService:AlbumService) {
    this.photos = photoInfo.photos;
    this.currentIndex = photoInfo.currentIndex;

  }

  ngOnInit() {
    this.initPhotoData()
  }
  save(){
    if(this.photoInfo.isBatch){
        for (let p of this.photos){
          this.savePhotoInfo(p);
        }
    }else{
      this.savePhotoInfo(this.photo);
    }
    console.log(this.photoInfo)
  }
  savePhotoInfo(photo:ShowUploadPhoto){
    photo.bright = this.tempPhoto.bright;
    photo.contrast = this.tempPhoto.contrast;
    photo.sharpen = this.tempPhoto.sharpen;
    photo.blurR = this.tempPhoto.blurR;
    photo.blurS = this.tempPhoto.blurS;
    if(this.addWaterMark){
      photo.watermark = this.zoomInWaterArgs+this.base64UrlName+`,size_${photo.fontSize}`;
    }else{
      photo.watermark=undefined;
      console.log(photo.watermark)
    }
  }
  /**
   * 上一张照片
   */
  prevPhoto(){
    this.currentIndex--;
    this.initCurrentPhoto();
    this.initPhotoData();
  }

  /**
   * 下一张照片
   */
  nextPhoto(){
    this.currentIndex++;
    this.initCurrentPhoto();
    this.initPhotoData();
  }

  /**
   * 初始化当前照片(切换相片后)
   */
  initCurrentPhoto(){
    this.photo=this.photos[this.currentIndex];
    this.waterMarkView=false;
    this.addWaterMark=false;

  }

  /**
   * 初始化相片数据
   */
  initPhotoData(){
    this.initArgs();
    this.initTempPhoto();
    this.refreshEffect();
  }

  /**
   * 初始化基本参数
   */
  initArgs(){
    if(this.photoInfo.isBatch){
      this.photo = this.photoInfo.photo;
    }else{
      this.photo = this.photoInfo.photos[this.currentIndex];
    }
    this.zoomInArgs="?x-oss-process=image/resize,m_fill,w_480,h_380/quality,q_100";
    this.zoomOutArgs =`?x-oss-process=image/resize,p_${this.photo.zoomSize}/crop,w_480,h_380,g_sw/quality,q_100`;
    this.zoomOutWaterArgs=`/watermark,image_c3RhdGljL3dhdGVyLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHBfNDA,g_sw,align_1,interval_5,color_FFFFFF,x_20,y_20,text_`;
    this.zoomInWaterArgs =  `/watermark,image_c3RhdGljL3dhdGVyLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHBfMjU,g_sw,align_1,interval_5,color_FFFFFF,x_20,y_20,text_`;
    this.zoomInFontSize=`,size_13`;
    this.zoomOutFontSize=",size_18";
    this.waterMarkView=false;
    this.addWaterMark=false;

    this.photoBaeArgs = this.zoomInArgs;
    this.waterMarkArgs = "";
    this.fontSize = "";
  }


  /**
   * 初始化临时相片
   */
  initTempPhoto(){
    console.log(this.photo);
    this.tempPhoto = new ShowUploadPhoto();
    this.tempPhoto.path = this.photo.path;
    this.tempPhoto.blurR=this.photo.blurR;
    this.tempPhoto.blurS=this.photo.blurS;

    /*如果有修改过就直接取出对应的值，否者初始化值*/
    if(this.photo.bright){
      this.tempPhoto.bright=this.photo.bright;
    }else{
      this.tempPhoto.bright=0
    }
    if(this.photo.sharpen){
      this.tempPhoto.sharpen=this.photo.sharpen;
    }else{
      this.tempPhoto.sharpen=50
    }
    if(this.photo.contrast){
      this.tempPhoto.contrast=this.photo.contrast;
    }else {
      this.tempPhoto.contrast=0;
    }
    if(this.photo.watermark){
      this.addWaterMark=true;
      this.generateWaterMark();
    }else{

    }
  }

  /**
   * 改变相片亮度
   * @param event
   */
  changeBright(event){
    this.tempPhoto.bright =event.value;
    this.refreshEffect();
  }

  /**
   * 改变相片锐化程度
   * @param event
   */
  changeSharpen(event){
    this.tempPhoto.sharpen =event.value;
    this.refreshEffect();
  }

  /**
   * 改变相片对比度
   * @param event
   */
  changeContrast(event){
    this.tempPhoto.contrast =event.value;
    this.refreshEffect();
  }

  /**
   * 改变相片模糊半径
   * @param event
   */
  changeBlurR(event){
    this.tempPhoto.blurR =event.value;
    if(this.tempPhoto.blurR==0){
      this.tempPhoto.blurS=0;
    }else{
      if(!this.tempPhoto.blurS){
        this.tempPhoto.blurS=1;
      }
    }
    this.refreshEffect();
  }

  /**
   * 改变相片模糊程度
   * @param event
   */
  changeBlurS(event){
    this.tempPhoto.blurS =event.value;
    if(this.tempPhoto.blurS==0){
      this.tempPhoto.blurR=0;
    }else {
      if(!this.tempPhoto.blurR){
        this.tempPhoto.blurR=1;
      }
    }
    this.refreshEffect();
  }

  /**
   * 刷新相片效果样式
   */
  refreshEffect(){
    this.effectArgs="";
    this.effectArgs+=`/bright,${this.tempPhoto.bright}/sharpen,${this.tempPhoto.sharpen}/contrast,${this.tempPhoto.contrast}`;
    if(this.tempPhoto.blurR||this.tempPhoto.blurS){
      if(this.tempPhoto.blurR==0||this.tempPhoto.blurS==0){
        this.effectArgs="";
      }else{
        this.effectArgs+=`/blur,r_${this.tempPhoto.blurR},s_${this.tempPhoto.blurS}`;
      }

    }
  }

  /**
   * 切换相片视图
   * @param event
   */
  toggleView(event){
    this.waterMarkView=event.checked;
    if(this.waterMarkView){
      this.zoomOutWaterMark();
    }else{
      this.zoomInWaterMark();
    }

  }

  /**
   * 生成Base64Url
   */
  generateBase64Url(){
    this.albumService.generateBase64Url(this.homeService.homeInfo.nickname).subscribe(res=>{
      this.base64UrlName=res;
      this.zoomOutWaterMark();
    });
  }

  /**
   * 切换添加水印
   * @param event
   */
  changeAddWaterMark(event){
    this.addWaterMark=event.checked;
    if(this.addWaterMark){
     this.generateWaterMark();
    }else{
      this.noWaterMark();
      this.waterMarkView=false;
      this.photoBaeArgs = this.zoomInArgs;
    }
  }
 generateWaterMark(){
   if(!this.base64UrlName){
     this.generateBase64Url();
   }else{
     this.zoomOutWaterMark();
   }
 }
  /**
   * 无水印参数
   */
  noWaterMark(){
    this.waterMarkArgs="";
  }

  /**
   * 放大水印参数
   */
  zoomOutWaterMark(){
    this.waterMarkView=true;
    this.photoBaeArgs = this.zoomOutArgs;
    this.waterMarkArgs = this.zoomOutWaterArgs+this.base64UrlName+this.zoomOutFontSize;
  }

  /**
   * 缩小水印参数
   */
  zoomInWaterMark(){
    this.photoBaeArgs = this.zoomInArgs;
    this.waterMarkArgs = this.zoomInWaterArgs+this.base64UrlName+this.zoomInFontSize;
  }
}
