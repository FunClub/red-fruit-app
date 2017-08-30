import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RfEditorOptions} from "../../model/base/rf-editor-options.model";
import {InsertSubDiscussion} from "../../model/discussion/insert-sub-discussion";
import {DiscussionService} from "../../service/discussion.service";
import {RefreshDiscussion} from "../../model/discussion/refresh-discussion.model";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {NoticeArtType} from "../../../foot-mark/model/notice-art-type";
import {ArtArgs} from "../../model/base/art-args.model";
import {NoticeArtService} from "../../../foot-mark/service/notice-art.service";
import {ShowSubDiscussion} from "../../model/discussion/show-sub-discussion.model";
import {BaseSocketService} from "../../../websocket/socket/base-socket.service";
import {HomeService} from "../../../home/service/home.service";
import {NoticeMessage} from "../../../websocket/model/notice-message.model";

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
   * 通知动态通知组件刷新评论
   * @type {EventEmitter<ShowSubDiscussion>}
   */
  @Output()
  refreshNoticeArtDiscussion = new EventEmitter<ShowSubDiscussion>();
  /**
   * 发送子评论的订阅
   */
  sendSubDiscussionSubscribe;
  constructor(private discussionService:DiscussionService,private noticeArtService:NoticeArtService,
              private refreshDiscussion:RefreshDiscussion,private noticeType:NoticeArtType,
  private socketService:BaseSocketService,private homeService:HomeService,private noticeMessage:NoticeMessage
  ) {
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
        //通知父组件查新评论
        this.refreshDiscussionNotice.emit(this.refreshDiscussion);
        this.refreshNoticeArtDiscussion.emit(res);
        //发送评论通知
        //发送评论回复通知
        if(this.sendToUserId!=this.homeService.homeInfo.userId){
          this.noticeMessage.content="回复了你的评论";
          this.noticeMessage.receivedUserId = this.sendToUserId;
          this.socketService.sendMessage(this.noticeMessage);
        }
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

    this.subDiscussion.noticeArt=this.noticeArtService.initNoticeArtData(this.artArgs);
    this.subDiscussion.noticeArt.noticeArtType=this.noticeType.REPLY;
    this.subDiscussion.noticeArt.artType=this.noticeType.DISCUSSION;
    this.subDiscussion.noticeArt.noticeArtUserId = this.sendToUserId;
    this.initEditor();
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
