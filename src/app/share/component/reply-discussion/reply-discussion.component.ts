import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RfEditorOptions} from "../../model/rf-editor-options.model";
import {InsertSubDiscussion} from "../../model/discussion/insert-sub-discussion";
import {DiscussionService} from "../../service/discussion.service";
import {RefreshDiscussion} from "../../model/discussion/refresh-discussion.model";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {NoticeArtType} from "../../../foot-mark/model/notice-art-type";
import {ArtArgs} from "../../model/base/art-args.model";

declare var $:any;
@Component({
  selector: 'app-reply-discussion',
  templateUrl: './reply-discussion.component.html',
  styleUrls: ['./reply-discussion.component.css'],
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
   * 动态类型
   */
  @Input()
  artArgs:ArtArgs;
  /**
   * 回复子评论的昵称,显示在编辑器中
   */
  @Input()
  sendToNickName:string;

  /**
   * 父级评论索引,用于更新子评论
   */
  @Input()
  parentDiscussionIndex:number;

  /**
   * 子评论索引，用于关闭子评论
   */
  @Input()
  subDiscussionIndex:number;
  /**
   * 通知父组件刷新评论
   */
  @Output()
  refreshDiscussionNotice = new EventEmitter<RefreshDiscussion>();
  /**
   * 发送子评论的订阅
   */
  sendSubDiscussionSubscribe;
  constructor(private discussionService:DiscussionService,private refreshDiscussion:RefreshDiscussion,private noticeType:NoticeArtType) {
    this.subDiscussion = new InsertSubDiscussion();
  }

  /**
   * 插入子评论
   */
  insertSubDiscussion(){
    this.sendSubDiscussionSubscribe=this.discussionService.insertSubDiscussion(this.subDiscussion).subscribe(res=>{
      if(res){
        this.subDiscussion.subDiscussion.content="";
        this.refreshDiscussion.subDiscussion = res;
        this.refreshDiscussionNotice.emit(this.refreshDiscussion);
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
    this.subDiscussion.subDiscussion.sendToUserId=this.sendToUserId;
    this.refreshDiscussion.parentDiscussionIndex=this.parentDiscussionIndex;
    this.refreshDiscussion.subDiscussionIndex=this.subDiscussionIndex;

    this.initNoticeArtData();
    this.initEditor();
  }

  /**
   * 初始化通知动态
   */
  initNoticeArtData(){
    this.subDiscussion.noticeArt.artId=this.artArgs.artId;
    this.subDiscussion.noticeArt.noticeArtUserId=this.artArgs.artUserId;
    this.subDiscussion.noticeArt.artType=this.artArgs.artType;
    this.subDiscussion.noticeArt.noticeArtType=this.noticeType.DISCUSSION;
    if(!this.artArgs.original){
      this.subDiscussion.noticeArt.originalArtId = this.artArgs.originalArtId;
      this.subDiscussion.noticeArt.originalUserId = this.artArgs.originalUserId;
    }
    this.subDiscussion.noticeArt.firstArtImg = this.artArgs.firstArtImg;
    this.subDiscussion.noticeArt.artContent = this.artArgs.artContent;
  }
  ngAfterViewInit(){
    $('.fr-box a').remove();
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
    this.faceOpened=false;
  }

  /**
   * 关闭表情
   */
  closeFace(){
    this.faceOpened=false;
  }
}
