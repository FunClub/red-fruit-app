import {Component, Inject, OnInit} from '@angular/core';
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {HomeService} from "../../../../home/service/home.service";
import {AlbumService} from "../../../service/album.service";

import {MD_DIALOG_DATA} from "@angular/material";
import {WaterMarkArgs} from "../../../model/album/water-mark-args.model";
import {Photo} from "../../../model/album/add-photo.model";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Component({
  selector: 'app-water-mark',
  templateUrl: './water-mark.component.html',
  styleUrls: ['./water-mark.component.css']
})
export class WaterMarkComponent implements OnInit {
  /**
   * 相片放大缩小基本参数
   */
  zoomOutArgs:string;
  zoomInArgs:string;

  /**
   * 相片放大缩小字体大小
   */
  zoomInFontSize:string;
  zoomOutFontSize:string;

  /**
   * 相片放大缩小水印参数
   */
  zoomOutWaterArgs:string;
  zoomInWaterArgs:string;

  /**
   * 昵称BASE64URL
   */
  base64UrlName:string;

  /**
   * 相片基本参数
   */
  photoBaeArgs:string;

  /**
   * 水印字体大小
   */
  fontSize:string;

  /**
   * 水印参数
   */
  waterMarkArgs:string;

  /**
   * 相片效果参数
   */
  effectArgs:string;
  /**
   * 是否显示水印视图
   */
  waterMarkView:boolean;
  /**
   * 零时相片模型
   */
  tempPhotos:Photo[];
  /**
   * 当前正在显示的照片
   */
  photo:Photo;

  /**
   * 相册数组
   */
  photos:Photo[];

  /**
   * 相片索引
   */
  currentIndex:number;
  /**
   * 用于保存的水印
   */
  saveWaterMark:string;

  constructor(@Inject(MD_DIALOG_DATA)public photoInfo:WaterMarkArgs, public api:RedFruitApi,
              private homeService:HomeService,private albumService:AlbumService) {
    this.photos = photoInfo.photos;
    this.currentIndex = photoInfo.currentIndex;
  }

  ngOnInit() {
    if(this.photoInfo.isBatch){
      this.photo = this.photoInfo.photo;
    }else{
      this.photo = this.photoInfo.photos[this.currentIndex];
    }
    /*备份相片数组信息便于恢复*/
    this.tempPhotos = [];
    for(let p of this.photos){
      let obj = new Photo();
      for(let key in p){
        obj[key]=p[key];
      }
      this.tempPhotos.push(obj);
    }
    this.generateBase64Url();
    this.initPhotoData()
  }

  /**
   * 保存相册编辑信息
   * @param close
   */
  save(close:HTMLButtonElement){
    //批处理
    if(this.photoInfo.isBatch){
        for (let p of this.photos){
          if(this.photo.hasWaterMark){
            p.waterMark = this.saveWaterMark+this.base64UrlName+`,size_${p.fontSize}`;
          }else{
            p.waterMark=""
          }
          p.hasWaterMark=this.photo.hasWaterMark;
          p.blurR=this.photo.blurR;
          p.blurS= this.photo.blurS;
          p.contrast=this.photo.contrast;
          p.sharpen=this.photo.sharpen;
          p.bright = this.photo.bright;
          p.effect = this.effectArgs;
        }
    }else{//单张处理
      for(let p of this.photos){
        if(p.hasWaterMark){
          p.waterMark = this.saveWaterMark+this.base64UrlName+`,size_${p.fontSize}`;
        }else{
          p.waterMark=""
        }

      }
    }
    close.click();
  }

  /**
   * 关闭dialog
   * @param close
   */
  closeDialog(close:HTMLHtmlElement){
    //不是批处理，关闭dialog，恢复相册数据
    if(!this.photoInfo.isBatch){
      for(let i=0;i<this.photos.length;i++){
        this.resetPhoto(this.photos[i],this.tempPhotos[i]);
      }
    }
    close.click();
  }

  /**
   * 点击重置按钮恢复信息
   */
  clickResetPhoto(){
    this.photo.bright=0;
    this.photo.sharpen=50;
    this.photo.contrast=0;
    this.photo.blurS=0;
    this.photo.blurR=0;
    this.photo.hasWaterMark=false;
    this.photo.waterMark="";
    this.initPhotoData()
  }
  /**
   * 恢复相片信息
   * @param photo 待恢复的相片
   * @param targetPhoto 恢复的相片
   */
  resetPhoto(photo:Photo,targetPhoto:Photo){
    for(let key in targetPhoto){
      photo[key]=targetPhoto[key];
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
    if(this.photo.hasWaterMark){
      this.waterMarkView=true;
      this.zoomOutWaterMark();
    }
  }

  /**
   * 初始化相片数据(用于每次相片切换后，包括第一张相片初始化)
   */
  initPhotoData(){
    this.initArgs();
    this.refreshEffect();
  }

  /**
   * 初始化基本参数
   */
  initArgs(){
    this.zoomInArgs="?x-oss-process=image/resize,m_fill,w_480,h_380/quality,q_100";
    this.zoomOutArgs =`?x-oss-process=image/resize,p_${this.photo.zoomSize}/crop,w_480,h_380,g_sw/quality,q_100`;
    this.zoomOutWaterArgs=`/watermark,image_c3RhdGljL3dhdGVyLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHBfNDA,g_sw,align_1,interval_5,color_FFFFFF,x_20,y_20,text_`;
    this.zoomInWaterArgs =  `/watermark,image_c3RhdGljL3dhdGVyLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHBfMjU,g_sw,align_1,interval_5,color_FFFFFF,x_20,y_20,text_`;
    this.saveWaterMark=`/watermark,image_c3RhdGljL3dhdGVyLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMw,g_sw,align_1,interval_5,color_FFFFFF,x_20,y_20,text_`
    this.zoomInFontSize=`,size_13`;
    this.zoomOutFontSize=",size_18";
    this.photoBaeArgs = this.zoomInArgs;
    this.waterMarkArgs = "";
    this.fontSize = "";
    if(this.photo.hasWaterMark){
      this.waterMarkView=true;
      this.generateWaterMark();
    }
  }

  /**
   * 改变相片亮度
   * @param event
   */
  changeBright(event){
    this.photo.bright =event.value;
    this.refreshEffect();
  }

  /**
   * 改变相片锐化程度
   * @param event
   */
  changeSharpen(event){
    this.photo.sharpen =event.value;
    this.refreshEffect();
  }

  /**
   * 改变相片对比度
   * @param event
   */
  changeContrast(event){
    this.photo.contrast =event.value;
    this.refreshEffect();
  }

  /**
   * 改变相片模糊半径
   * @param event
   */
  changeBlurR(event){
    this.photo.blurR =event.value;
    if(this.photo.blurR==0){
      this.photo.blurS=0;
    }else{
      if(!this.photo.blurS){
        this.photo.blurS=1;
      }
    }
    this.refreshEffect();
  }

  /**
   * 改变相片模糊程度
   * @param event
   */
  changeBlurS(event){
    this.photo.blurS =event.value;
    if(this.photo.blurS==0){
      this.photo.blurR=0;
    }else {
      if(!this.photo.blurR){
        this.photo.blurR=1;
      }
    }
    this.refreshEffect();
  }

  /**
   * 刷新相片效果样式
   */
  refreshEffect(){
    this.effectArgs="";
    this.effectArgs+=`/bright,${this.photo.bright}/sharpen,${this.photo.sharpen}/contrast,${this.photo.contrast}`;
    if(this.photo.blurR||this.photo.blurS){
      if(this.photo.blurR==0||this.photo.blurS==0){
        this.effectArgs="";
      }else{
        this.effectArgs+=`/blur,r_${this.photo.blurR},s_${this.photo.blurS}`;
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
      if(this.photo.hasWaterMark){
        this.zoomOutWaterMark();
      }
    });
  }

  /**
   * 切换添加水印
   * @param event
   */
  changeAddWaterMark(event){
    this.photo.hasWaterMark=event.checked;
    if(this.photo.hasWaterMark){
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
