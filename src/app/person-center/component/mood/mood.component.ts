import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from '../../../share/model/rf-editor-options.model';
import {MoodService} from "../../service/mood.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {InsertMood} from "../../model/insert-mood";
import {Limit} from "../../model/limit.enum";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {NgProgressService} from "ngx-progressbar";
import {SelectMoodCondition} from "../../model/select-mood-condition.model";
import {PagedMood} from "../../model/paged-mood";
import {ShowMoodDto} from "../../model/show-mood-dto.model";
import {HomeService} from "../../../home/service/home.service";
import {Mood} from "../../model/mood";
declare let $:any;
@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-5%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(5px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(5px)'}),
          style({opacity: 0, transform: 'translateY(-5%)'})
        ]))
      ])
    ]),
  trigger('flyXInOutFromRight', [
    transition('void => *', [
      animate("300ms",keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 0.5, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),

  ]),
  ]
})
export class MoodComponent implements OnInit {
  editorContent=" ";
  faceOpened=false;
  uploadImgOpened=false;
  moods:ShowMoodDto[];
  constructor(public moodService:MoodService,public rfOptions:RfEditorOptions,public insertMood:InsertMood,
              private toastsManager:ToastsManager,private toastOptions:ToastOptions,private ngProgressService:NgProgressService,
              private selectMoodCondition:SelectMoodCondition,public pagedMood:PagedMood,private homeService:HomeService
  ) {
    this.initEditor();
  }

  /**
   * 初始化编辑器
   */
  initEditor(){
    this.rfOptions.imageResize=false;
    this.rfOptions.placeholderText="今天，有什么不高兴的事吗，写写吧";
    this.rfOptions.toolbarButtons=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsXS=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsSM=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.quickInsertButtons= ['table', 'ul', 'ol', 'hr'];
  }
  ngOnInit() {
    this.ngProgressService.start();
    this.selectMoodCondition.byHalf=true;
    this.moodService.selectMood(this.selectMoodCondition).subscribe(res=>{
     this.pagedMood=res;
     this.moods=this.pagedMood.content;
     this.ngProgressService.done();
    });
  }

  /**
   * 发布心情
   */
  sendMood(){
    this.insertMood.imgs=this.moodService.sharePreUploadImgs;
    this.ngProgressService.start();
    this.moodService.insertMood(this.insertMood).subscribe(res=>{
      if(res){
        this.toastsManager.success("发表心情成功","发表结果",this.toastOptions);
        this.moodService.selectMood(this.selectMoodCondition).subscribe(res=>{
          this.pagedMood=res;
          this.moods=this.pagedMood.content;
          this.ngProgressService.done();
        });
      }else{
        this.toastsManager.error("发表心情失败，请重试","发表结果",this.toastOptions);
      }
      this.clearData();
    });
  }


  /**
   * 发布心情后清空数据
   */
  clearData(){
    this.moodService.sharePreUploadImgs=[];
    this.insertMood.imgs=[];
    this.insertMood.content="";
    this.insertMood.limit=1;
  }

  /**
   * 改变心情权限
   * @param limit
   */
  changeLimit(limit:number){
    this.insertMood.limit=limit;
  }
  /**
   * 关闭表情面板
   * @param uploadImgOpened
   */
  closeUploadImg(uploadImgOpened:boolean){
    this.uploadImgOpened=uploadImgOpened;
  }
  /**
   * 切换图片上传面板
   */
  toggleUploadImg(){
    this.uploadImgOpened=!this.uploadImgOpened;
  }

  /**
   * 切换表情面板
   */
  toggleFace(){
    this.faceOpened=!this.faceOpened;
  }

  /**
   * 关闭表情面板
   * @param faceOpened
   */
  closeFace(faceOpened:boolean){
    this.faceOpened=faceOpened;
  }

  /**
   * 追加表情到编辑器
   * @param faceImg 表情html
   */
  appendFace(faceImg:string){
    $('.mood-editor').froalaEditor('html.insert', faceImg);
  }

}
