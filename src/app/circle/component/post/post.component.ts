import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShowPost, Post} from "../../model/post.model";
import {CircleService} from "../../service/circle.service";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {ArtInfo} from "../../../share/model/base/art-dto.model";
import {ArtArgs} from "../../../share/model/base/art-args.model";
import {ArtType} from "../../../foot-mark/model/art-type.model";
import {SelectDiscussionCondition} from "../../../share/model/discussion/select-discussion-condition";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postId:string;
  showPost:ShowPost;
  artInfo:ArtInfo;
  post:Post;
  artArgs:ArtArgs;

  constructor(private activatedRoute:ActivatedRoute,private circleService:CircleService,public api:RedFruitApi,private artType:ArtType) {
    this.postId = this.activatedRoute.snapshot.params['postId'];

  }

  ngOnInit() {
    this.circleService.selectPost(this.postId).subscribe(res=>{
      if(res){
        this.showPost=res;
        this.post= this.showPost.post;
        this.artInfo = this.showPost.artInfo;
        this.initPostArtArgs()
      }

    });
  }

  /**
   * 初始化帖子动态参数
   */
  initPostArtArgs(){
    this.artArgs = new ArtArgs();
    this.artArgs.discussionCount=this.artInfo.discussionCount;
    this.artArgs.thumbsUpCount=this.artInfo.thumbsUpCount;
    this.artArgs.thumbsUpAble=this.artInfo.thumbsUpAble;
    this.artArgs.artType=this.artType.NOTE;
    this.artArgs.artId = this.post.userId;
    this.artArgs.artUserId=this.post.userId;
    this.artArgs.showPaginator=true;
    this.artArgs.original = this.post.original;
    if(!this.artArgs.original){//如果心情不是原创
      this.artArgs.originalUserId = this.post.originalUserId;
      this.artArgs.originalArtId = this.post.originalArtId;
    }
    //评论的查询参数
    this.artArgs.selectDiscussionCondition = new SelectDiscussionCondition();
    this.artArgs.selectDiscussionCondition.artId=this.artArgs.artId;
    //通知动态参数
    this.artArgs.artContent = this.post.title;
  }
}
