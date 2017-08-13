import {Component, Input, OnInit} from '@angular/core';
import {ShowNoticeDto} from "../../model/show-notice-dto.model";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {ArtArgs} from "../../../share/model/base/art-args.model";
import {ShowSubDiscussion} from "../../../share/model/discussion/show-sub-discussion.model";

@Component({
  selector: 'app-single-art',
  templateUrl: './single-art.component.html',
  styleUrls: ['./single-art.component.css']
})
export class SingleArtComponent implements OnInit {

  @Input()
  noticeArt:ShowNoticeDto;
  artArgs:ArtArgs;
  constructor(public api:RedFruitApi) { }

  ngOnInit() {
    this.initArtArgs();
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
  refreshDiscussion(subDiscussion:ShowSubDiscussion,reply:any){
    reply.showReply=false;
    if(this.noticeArt.discussion.subDiscussionDtos==null){
      this.noticeArt.discussion.subDiscussionDtos=[];
    }
    this.noticeArt.discussion.subDiscussionDtos.push(subDiscussion);
  }
  toggleReply(reply:any){
    reply.showReply=! reply.showReply;
  }
}
