import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from '../../../share/model/rf-editor-options.model';
import {MoodService} from "../../service/mood.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
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
  public rfOptions:RfEditorOptions;
  constructor(public moodServce:MoodService) {
    this.rfOptions = new RfEditorOptions();
    this.rfOptions.imageResize=false;
    this.rfOptions.placeholderText="今天，有什么不高兴的事吗，写写吧";
    this.rfOptions.toolbarButtons=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsXS=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.toolbarButtonsSM=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    this.rfOptions.quickInsertButtons= ['table', 'ul', 'ol', 'hr'];
  }
  ngOnInit() {
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
    console.log(faceImg)
    $('.mood-editor').froalaEditor('html.insert', faceImg);
  }

}
