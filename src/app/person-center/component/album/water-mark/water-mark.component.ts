import {Component, Inject, OnInit} from '@angular/core';
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {HomeService} from "../../../../home/service/home.service";
import {AlbumService} from "../../../service/album.service";
import {ShowUploadPhoto} from "../../../model/album/show-upload-photo.model";
import {MD_DIALOG_DATA} from "@angular/material";

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

  waterMarkArgs:string;

  zoomArgs:string;
  fontSize:string;

  base64UrlName:string;
  /**
   * 是否显示水印图
   */
  waterMarkView:boolean;

  constructor(@Inject(MD_DIALOG_DATA)public photo:ShowUploadPhoto, public api:RedFruitApi,private homeService:HomeService,private albumService:AlbumService) {
    this.base64UrlName="57qi5p6c5oOF5L6j";

    this.zoomInArgs="?x-oss-process=image/resize,m_fill,w_480,h_330/quality,q_100";
    this.zoomOutArgs =`?x-oss-process=image/resize,p_${photo.zoomSize}/crop,w_480,h_330,g_sw/quality,q_100`;
    this.zoomOutWaterArgs=`/watermark,image_c3RhdGljL3dhdGVyLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHBfNTA,g_sw,align_1,interval_5,color_FFFFFF,x_20,y_20,text_`;
    this.zoomInWaterArgs =  `/watermark,image_c3RhdGljL3dhdGVyLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHBfMjU,g_sw,align_1,interval_5,color_FFFFFF,x_20,y_20,text_`;
    this.zoomInFontSize=",size_13";
    this.zoomOutFontSize=",size_18";
    this.waterMarkView=true;

    this.fontSize =this.zoomOutFontSize;
    this.zoomArgs = this.zoomOutArgs;
    this.waterMarkArgs = this.zoomOutWaterArgs;

  }

  ngOnInit() {
    this.albumService.generateBase64Url(this.homeService.homeInfo.nickname).subscribe(res=>{
      this.base64UrlName=res;
    });
  }
  toggleView(event){
    this.waterMarkView=event.checked;
    if(this.waterMarkView){
      this.fontSize =this.zoomOutFontSize;
      this.zoomArgs = this.zoomOutArgs;
      this.waterMarkArgs = this.zoomOutWaterArgs;
    }else{
      this.fontSize=this.zoomInFontSize;
      this.zoomArgs = this.zoomInArgs;
      this.waterMarkArgs = this.zoomInWaterArgs;
    }

   /* this.waterMarkView=!this.waterMarkView;*/
  }
  commonStyle(){

  }
}
