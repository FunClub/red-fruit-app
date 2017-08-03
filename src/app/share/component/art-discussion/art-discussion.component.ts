import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from "../../model/rf-editor-options.model";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
declare let $:any;
@Component({
  selector: 'app-art-discussion',
  templateUrl: './art-discussion.component.html',
  styleUrls: ['./art-discussion.component.css'],
  animations:[
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
  ]
})
export class ArtDiscussionComponent implements OnInit {

  faceOpened=false;
  public editorOptions:RfEditorOptions;
  editorContent:string="";
  constructor() {
    this.editorOptions= new RfEditorOptions();
    this.editorOptions.toolbarButtons=[];
    this.editorOptions.toolbarButtonsSM=[];
    this.editorOptions.toolbarButtonsXS=[];
    this.editorOptions.heightMin=30;
    this.editorOptions.heightMax=100;
    this.editorOptions.imageResize=false;
    this.editorOptions.placeholderText="吐槽点什么吧";
    this.editorOptions.editorClass="editor-box";
  }

  ngOnInit() {

  }

  toggleFace(){
    this.faceOpened=!this.faceOpened;
  }
  /**
   * 追加表情到编辑器
   * @param discussionEditor
   * @param faceImg 表情html
   */
  appendFace(discussionEditor:any,faceImg:string){
    $('.discussion-editor').froalaEditor('html.insert', faceImg);
  }
  /**
   * 关闭表情面板
   * @param faceOpened
   */
  closeFace(faceOpened:boolean){
    this.faceOpened=faceOpened;
  }

}
