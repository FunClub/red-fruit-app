import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RfEditorOptions} from "../../model/rf-editor-options.model";
import {animate, keyframes,style, transition, trigger} from "@angular/animations";
import {HomeService} from "../../../home/service/home.service";
import {InsertDiscussion} from "../../model/discussion/insert-discussion.model";
import {DiscussionService} from "../../service/discussion.service";
import {SelectDiscussionCondition} from "../../model/discussion/select-discussion-condition";
import {ShowPagedDiscussion} from "../../model/discussion/show-paged-discussion.model";
import {ShowParentDiscussion} from "../../model/discussion/show-parent-discussion.model";
import {ShowSubDiscussion} from "../../model/discussion/show-sub-discussion.model";
import {RefreshDiscussion} from "../../model/discussion/refresh-discussion.model";
import {ArtArgs} from "../../model/base/art-args.model";
import {NoticeArtType} from "../../../foot-mark/model/notice-art-type";
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
export class ArtDiscussionComponent{

  /**
   * 动态参数
   */
  @Input()
  artArgs:ArtArgs;

  /**
   * 分页变化
   * @type {EventEmitter}
   */
  @Output()
    pageChange = new EventEmitter();
  /**
   * 表情开关
   * @type {boolean}
   */
  faceOpened=false;

  /**
   * 评论订阅，用于显示正在处理的提示
   */
  discussionSubscribe;

  /**
   * 父级评论数组
   */
  parentDiscussions:ShowParentDiscussion[];

  /**
   * 编辑器配置
   */
  editorOptions:RfEditorOptions;

  /**
   * 评论查询条件
   */
  selectDiscussion:SelectDiscussionCondition;

  /**
   * 插入评论
   */
  sendDiscussion:InsertDiscussion;

  pageSizeOptions = [5, 10, 25, 100];
  constructor(public homeService:HomeService,public discussionService:DiscussionService,
              private pagedDiscussion:ShowPagedDiscussion,private noticeType:NoticeArtType) {
    this.initEditor();
    this.sendDiscussion = new InsertDiscussion();
  }

  ngOnInit() {
    this.initNoticeArtData();
    if(this.artArgs.discussionCount>0){
      this.showDiscussion();
    }
  }

  /**
   * 初始化通知动态数据
   */
  initNoticeArtData(){
    this.selectDiscussion = this.artArgs.selectDiscussionCondition;
    this.sendDiscussion.parentDiscussion.artId=this.artArgs.artId;
    if(!this.artArgs.original){
      this.sendDiscussion.noticeArt.originalArtId =this.artArgs.originalArtId;
      this.sendDiscussion.noticeArt.originalUserId =this.artArgs.originalUserId;
    }
    this.sendDiscussion.noticeArt.artId=this.artArgs.artId;
    this.sendDiscussion.noticeArt.noticeArtUserId = this.artArgs.artUserId;
    this.sendDiscussion.noticeArt.artType=this.artArgs.artType;
    this.sendDiscussion.noticeArt.noticeArtType=this.noticeType.DISCUSSION;
    this.sendDiscussion.noticeArt.artContent = this.artArgs.artContent;
    this.sendDiscussion.noticeArt.firstArtImg = this.artArgs.firstArtImg;
  }
  ngAfterViewInit(){
    $('.fr-box a').remove();
  }
  changePage(e){
    this.selectDiscussion.pageIndex=e.pageIndex;
    this.selectDiscussion.pageSize=e.pageSize;
    this.showDiscussion();
    this.pageChange.emit()
  }
  /**
   * 删除评论
   * @param discussionId 评论id
   * @param index 评论索引，便于在界面上删除
   */
  deleteDiscussion(discussionId:string,index:number){
    this.discussionSubscribe=this.discussionService.deleteParentDiscussion(discussionId).subscribe(res=>{
      if(res){
       this.parentDiscussions.splice(index,1);
       this.artArgs.discussionCount--;
      }
    })
  }
  /**
   * 按照时间或热度排序
   */
  sortDiscussionBy(sortBy:string){
    this.selectDiscussion.sortBy=sortBy;
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
    parentDiscussion.subDiscussionDtos.push(refreshDiscussion.subDiscussion);
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
    this.discussionSubscribe=this.discussionService.selectDiscussion(this.selectDiscussion).subscribe(res=>{
      this.parentDiscussions=res.content;
    });
  }
  /**
   * 插入父级评论
   */
  insertDiscussion(){
    this.discussionSubscribe=this.discussionService.insertParentDiscussion(this.sendDiscussion).subscribe(res=>{
          if(res){
            this.artArgs.discussionCount++;
            this.sendDiscussion.parentDiscussion.content="";
            this.parentDiscussions==null? this.parentDiscussions=[]:"";
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
    this.faceOpened=false;
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
    this.artArgs.isDiscussOpen=false;
  }
}
