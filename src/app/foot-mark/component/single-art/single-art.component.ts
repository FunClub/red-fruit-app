import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShowNoticeDto} from "../../model/show-notice-dto.model";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {ArtArgs} from "../../../share/model/base/art-args.model";
import {ShowSubDiscussion} from "../../../share/model/discussion/show-sub-discussion.model";
import {DeleteNoticeArt} from "../../model/delete-notice-art.model";
import {NoticeArtService} from "../../service/notice-art.service";
@Component({
  selector: 'app-single-art',
  templateUrl: './single-art.component.html',
  styleUrls: ['./single-art.component.css']
})
export class SingleArtComponent implements OnInit {
  /**
   * 通知动态数据
   */
  @Input()
  noticeArt:ShowNoticeDto;

  /**
   * 动态参数，传递给回复组件
   */
  artArgs:ArtArgs;

  /**
   * 删除通知模型
   */
  deleteNoticeArt:DeleteNoticeArt;

  /**
   * 删除动态通知时间
   * @type {EventEmitter<number>}number代表通知动态索引
   */
  @Output()
  refreshNoticeArt = new EventEmitter<number>();

  /**
   * 本动态通知所在父组件的索引，用于删除本组件
   */
  @Input()
  noticeArtIndex:number;
  constructor(public api:RedFruitApi,private noticeArtService:NoticeArtService) {

  }

  ngOnInit() {
    this.initArtArgs();
    this.deleteNoticeArt = new DeleteNoticeArt();
    if(this.noticeArt.discussion!=null){
      this.deleteNoticeArt.discussionId = this.noticeArt.discussion.discussionId;
    }
    this.deleteNoticeArt.noticeArtId = this.noticeArt.noticeArtId;
  }
  initArtArgs(){
    this.artArgs = new ArtArgs();
    this.artArgs.artId = this.noticeArt.artId;
    this.artArgs.artUserId = this.noticeArt.artUserId;
    this.artArgs.artType = this.noticeArt.artType;
    this.artArgs.original = this.noticeArt.original;
    this.artArgs.originalUserId = this.noticeArt.originalUserId;
    this.artArgs.originalArtId = this.noticeArt.originalArtId;
    this.artArgs.firstArtImg = this.noticeArt.firstArtImg;
    this.artArgs.artContent = this.noticeArt.artContent;
  }

  /**
   * 删除动态通知
   */
  deleteNotice(){

    this.noticeArtService.deleteNoticeArt(this.deleteNoticeArt).subscribe(res=>{
      if(res){
        this.refreshNoticeArt.emit(this.noticeArtIndex);
      }
    });
  }

  /**
   * 刷新通知动态
   * @param subDiscussion 子评论
   * @param reply 是否显示回复
   */
  refreshDiscussion(subDiscussion:ShowSubDiscussion,reply:any){
    reply.showReply=false;
    if(this.noticeArt.discussion.subDiscussionDtos==null){
      this.noticeArt.discussion.subDiscussionDtos=[];
    }
    this.noticeArt.discussion.subDiscussionDtos.push(subDiscussion);
  }

  /**
   * 切换回复编辑器
   * @param reply
   */
  toggleReply(reply:any){
    reply.showReply=! reply.showReply;
  }
}
