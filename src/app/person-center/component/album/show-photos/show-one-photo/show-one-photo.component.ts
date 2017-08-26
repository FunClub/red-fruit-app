import {Component, Inject, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {MD_DIALOG_DATA} from "@angular/material";
import {ShowPhotoArg} from "../../../../model/album/show-photo-arg.model";
import {ShowAlbum} from "../../../../model/album/show-album.model";
import {Photo} from "../../../../model/album/add-photo.model";
import {RedFruitApi} from "../../../../../share/model/base/api.model";
import {AlbumApi} from "../../../../model/base/album-api.model";
import {CursorType} from "../../../../../share/model/base/cursor-type.model";

@Component({
  selector: 'app-show-one-photo',
  templateUrl: './show-one-photo.component.html',
  styleUrls: ['./show-one-photo.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
      transition('void => *', [
        animate("300ms", keyframes([
          style({opacity: 0, transform: 'translateY(10px)'}),
          style({opacity: 0.5, transform: 'translateY(0)'}),
          style({opacity: 1, transform: 'translateY(0)'})
        ]))
      ]),
      transition('* => void', [
        animate("300ms", keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(5px)'}),
          style({opacity: 0, transform: 'translateY(10px)'})
        ]))
      ])
    ]),
    trigger('flyXInOutFromRight', [
      transition('void => *', [
        animate("800ms", keyframes([
          style({opacity: 0, transform: 'translateX(-500px)'}),
          style({opacity: 0.5, transform: 'translateX(-250px)'}),
          style({opacity: 1, transform: 'translateX(0px)'})
        ]))
      ]),
    ])
  ]
})
export class ShowOnePhotoComponent implements OnInit {
  img = "http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170820000636-797568141234.JPG";
  img1 = "http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170820000636-797568141234.JPG?x-oss-process=style/small-album-cover";
  /**
   * 是否显示相片列表
   */
  showPhotoList: boolean;
  /**
   * window对象引用
   */
  windowRef: any;
  /**
   * 相册
   */
  album:ShowAlbum;

  /**
   * 相片数组
   */
  photos:Photo[];

  /**
   * 当前相片索引
   */
  currentIndex:number;
  /**
   * 光标类型
   */
  cursorType:number;

  /**
   * 光标类型参数
   */
  cursorArgs:CursorType;

  /**
   * 每一页显示照片数量
   */
  photoPageSize:number;

  /**
   * 当前照片索引
   */
  photoPageIndex:number;

  /**
   * 相片总页数
   */
  photoTotalPage:number;
  /**
   * 包裹全部相片的div left值
   */
  photoWrapperLeft:number;


  constructor(@Inject(MD_DIALOG_DATA)public photoArgs:ShowPhotoArg,public api:RedFruitApi,public albumApi:AlbumApi) {
    this.windowRef = window;
    this.photos=photoArgs.photos;
    this.album = photoArgs.album;
    this.currentIndex=this.photoArgs.currentIndex;
    this.cursorArgs = new CursorType();
    /*监听窗口大小重置事件*/
    window.onresize = () => {}
  }
  ngOnInit() {
    this.getPhotoContentWidth();
    this.getPhotoPageIndex();
    this.getPhotoWrapperLeft();
  }

  /**
   * 获得包裹全部相片的div left值
   */
  getPhotoWrapperLeft(){//100,10
    //当前显示的照片不在第一页
    let photoContentWidth = this.getPhotoContentWidth();

    this.photoWrapperLeft = -(this.photoPageIndex*photoContentWidth);

  }

  /**
   * 显示详细大图相片
   * @param index
   */
  showDetailPhoto(index:number){
    this.currentIndex=index;
  }

  /**
   * 下一页
   */
  nextPage(){
    if(this.photoPageIndex==this.photoTotalPage-1){
      this.photoPageIndex=0;
    }else{
      this.photoPageIndex++;
    }
    this.getPhotoWrapperLeft();
  }

  /**
   * 上一页
   */
  prevPage(){
    if(this.photoPageIndex==0){
      this.photoPageIndex=this.photoTotalPage-1;
    }else{
      this.photoPageIndex--;
    }
    this.getPhotoWrapperLeft();
  }
  /*获取当前页索引*/
  getPhotoPageIndex(){
    this.photoPageIndex= Math.floor((this.currentIndex)/ this.photoPageSize);
  }

  /**
   * 改变当前相片（上一张下一张）
   */
  changeCurrentPhoto(event,close:HTMLButtonElement){
    this.changeImgCursor(event);
    if(this.cursorType==this.cursorArgs.PREV_CURSOR){
      if(this.currentIndex==0){
        this.currentIndex=this.photos.length-1;
      }else{
        this.currentIndex--;
      }
    }else if (this.cursorType==this.cursorArgs.NEXT_CURSOR){
      if(this.currentIndex==this.photos.length-1){
        this.currentIndex=0;
      }else{
        this.currentIndex++;
      }
    }else{
      close.click();
    }
    /*调整相片列表*/
    this.getPhotoPageIndex();
    this.getPhotoWrapperLeft();
  }
  /**
   * 改变上一页下一页光标
   * @param event
   */
  changeImgCursor(event:MouseEvent){
    let x = event.x;
    let width = window.innerWidth-320;
    let preMax=(width/2)-(width/10);
    let nextMin=(width/2)+(width/10);
    if(preMax>x){
        this.cursorType= this.cursorArgs .PREV_CURSOR;
    }else if(nextMin<x){
        this.cursorType=this.cursorArgs .NEXT_CURSOR;
    }else{
      this.cursorType= this.cursorArgs .ZOOM_OUT_CURSOR;
    }
  }


  /**
   * 计算相片内容体宽度,同时设置photoPageSize,photoPageIndex
   * @returns {number}
   */
  getPhotoContentWidth():number{
    let innerWidth = window.innerWidth;
    let photoContentWidth = innerWidth*0.9-450;
    this.photoPageSize=Math.floor(photoContentWidth / 89);
    this.photoTotalPage = Math.ceil(this.photos.length/this.photoPageSize);
    return this.photoPageSize*89;
  }
  /**
   * 切换相片列表
   */
  togglePhotoList() {
    this.showPhotoList = !this.showPhotoList;
  }
}
