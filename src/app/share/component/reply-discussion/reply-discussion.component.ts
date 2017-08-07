import {Component, Input, OnInit} from '@angular/core';
import {RfEditorOptions} from "../../model/rf-editor-options.model";
import {InsertSubDiscussion} from "../../model/discussion/insert-sub-discussion";
import {DiscussionService} from "../../service/discussion.service";
declare var $:any;
@Component({
  selector: 'app-reply-discussion',
  templateUrl: './reply-discussion.component.html',
  styleUrls: ['./reply-discussion.component.css']
})
export class ReplyDiscussionComponent implements OnInit {
  /**
   * 是否打开表情
   * @type {boolean}
   */
  faceOpened=false;

  /**
   * 编辑器配置
   */
   editorOptions:RfEditorOptions;

  /**
   * 发送的子评论模型
   */
  subDiscussion:InsertSubDiscussion;

  /**
   * 父级评论id
   */
  @Input()
  discussionId:string;

  /**
   * 回复子评论的用户id
   */
  @Input()
  sendToUserId:string;

  /**
   * 回复子评论的昵称,显示在编辑器中
   */
  @Input()
    sendToNickName:string;
  /**
   * 发送子评论的订阅
   */
  sendSubDiscussionSubscribe;
  constructor(private discussionService:DiscussionService) {
    this.subDiscussion = new InsertSubDiscussion();
  }

  /**
   * 插入子评论
   */
  insertSubDiscussion(){
    this.sendSubDiscussionSubscribe=this.discussionService.insertSubDiscussion(this.subDiscussion).subscribe(res=>{
      if(res){
        this.subDiscussion.contend="";
      }
    })
  }
  /**
   * 初始化编辑器
   */
  initEditor(){
    this.editorOptions= new RfEditorOptions();
    this.editorOptions.toolbarButtons=[];
    this.editorOptions.toolbarButtonsSM=[];
    this.editorOptions.toolbarButtonsXS=[];
    this.editorOptions.heightMin=30;
    this.editorOptions.heightMax=100;
    this.editorOptions.imageResize=false;
    this.editorOptions.placeholderText="回复"+this.sendToNickName;
    this.editorOptions.editorClass="editor-box";
  }

  ngOnInit() {
    /*初始化从父组件传来的参数*/
    this.subDiscussion.discussionId=this.discussionId;
    this.subDiscussion.sendToUserId = this.sendToUserId;
    this.subDiscussion.sendToUserId=this.sendToUserId;
    this.initEditor();
  }

  /**
   * 切换表情
   */
  toggleFace(){
    this.faceOpened=!this.faceOpened;
  }

  /**
   * 追加表情到编辑器
   * @param discussionEditor
   * @param faceImg 表情html
   */
  appendFace(discussionEditor:any,faceImg:string){
    $('.sub-discussion-editor').froalaEditor('html.insert', faceImg);
  }

  /**
   * 关闭表情
   */
  closeFace(){
    this.faceOpened=false;
  }
}
