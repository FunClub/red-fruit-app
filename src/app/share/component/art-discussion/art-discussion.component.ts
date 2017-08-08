import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RfEditorOptions} from "../../model/rf-editor-options.model";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {HomeService} from "../../../home/service/home.service";
import {InsertDiscussion} from "../../model/discussion/insert-discussion.model";
import {DiscussionService} from "../../service/discussion.service";
import {SelectDiscussion} from "../../model/discussion/select-discussion";
import {ShowPagedDiscussion} from "../../model/discussion/show-paged-discussion.model";
import {ShowParentDiscussion} from "../../model/discussion/show-parent-discussion.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ShowSubDiscussion} from "../../model/discussion/show-sub-discussion.model";
import {RefreshDiscussion} from "../../model/discussion/refresh-discussion.model";
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
  @Input()
  artId:string;
  @Output()
  addDiscussionCount=new EventEmitter();
  @Output()
  closeDiscussion=new EventEmitter();
  faceOpened=false;
  sendParentDiscussionSubscribe;
  showDiscussionSubscribe;
  parentDiscussions:ShowParentDiscussion[];
  totalElements:number;
  public editorOptions:RfEditorOptions;
  sendDiscussion:InsertDiscussion;
  constructor(public homeService:HomeService,private discussionService:DiscussionService,
              private selectDiscussion:SelectDiscussion,private pagedDiscussion:ShowPagedDiscussion,private dom:DomSanitizer) {
    this.initEditor();
    this.sendDiscussion = new InsertDiscussion();
  }

  ngOnInit() {
    this.selectDiscussion.artId=this.artId;
    this.showDiscussion();
  }

  /**
   * 刷新子评论
   * @param refreshDiscussion
   */
  refreshSubDiscussion(refreshDiscussion:RefreshDiscussion){
    let parentDiscussion = this.parentDiscussions[refreshDiscussion.parentDiscussionIndex];
    if(parentDiscussion.subDiscussionDtos==null){
      parentDiscussion.subDiscussionDtos=[];
    }
    parentDiscussion.subDiscussionDtos.push(refreshDiscussion.subDiscussion)
    //关闭评论回复组件
    if( refreshDiscussion.subDiscussionIndex==null){//如果不是回复子评论，就直接关闭父评论回复
      parentDiscussion.showReply=false;
    }else{
      parentDiscussion.subDiscussionDtos[refreshDiscussion.subDiscussionIndex].showReply=false;
    }

  }
  /**
   * 父级评论显示与隐藏切换
   * @param discussion 父级评论
   */
  toggleParentReply(discussion:ShowParentDiscussion){
    discussion.showReply=!discussion.showReply;
  }

  /**
   * 子级评论显示与隐藏切换
   * @param discussion
   */
  toggleSubReply(discussion:ShowSubDiscussion){
    discussion.showReply=!discussion.showReply;
  }
  /**
   *点赞
   */
  updateThumbsUpUserIds(parentDiscussion:ShowParentDiscussion){
      if(parentDiscussion.thumbsUpAble){
        this.discussionService.updateThumbsUpUserIds(parentDiscussion.discussionId).subscribe(res=>{
          parentDiscussion.thumbsUpAble=false;parentDiscussion.thumbsUpCount++;
        });
      }
  }
  /**
   * 查询评论
   */
  showDiscussion(){
    this.showDiscussionSubscribe=this.discussionService.selectDiscussion(this.selectDiscussion).subscribe(res=>{
      this.parentDiscussions=res.content;
      this.totalElements=res.totalElements;
    });
  }
  /**
   * 插入父级评论
   */
  insertDiscussion(){
    this.sendDiscussion.artId=this.artId;
    this.sendParentDiscussionSubscribe=this.discussionService.insertParentDiscussion(this.sendDiscussion).subscribe(res=>{
          if(res){
            this.addDiscussionCount.emit();
            this.sendDiscussion.content="";
            this.parentDiscussions.push(res);
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
    this.editorOptions.placeholderText="吐槽点什么吧";
    this.editorOptions.editorClass="editor-box";
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

  /**
   * 关闭评论
   */
  closeAllDiscussion(){
    this.closeDiscussion.emit();
  }
}
