import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from '../../../share/model/rf-editor-options.model';
import {MoodService} from "../../service/mood.service";
@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {
  editorContent="";
  faceOpened=false;
  uploadImgOpened=false;
  constructor(public rfOptions:RfEditorOptions,public moodServce:MoodService) {
    rfOptions.imageResize=false;
    rfOptions.placeholderText="今天，有什么不高兴的事吗，写写吧";
    rfOptions.toolbarButtons=['bold','color','insertLink','fullscreen', 'html','undo', 'redo'];
    rfOptions.quickInsertButtons= ['table', 'ul', 'ol', 'hr'];
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
    this.editorContent+=faceImg;
  }

}
