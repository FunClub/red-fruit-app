import { Injectable } from '@angular/core';
import {BaseService} from "../../share/service/base.service";
import {Http} from "@angular/http";
import {InsertMood} from "../model/mood/insert-mood";
import {Observable} from "rxjs/Observable";
import {RedFruitApi} from "../../share/model/base/api.model";
import {SelectMoodCondition} from "../model/mood/select-mood-condition.model";
import {PagedMood} from "../model/mood/paged-mood";
import {ShowMoodDto} from "../model/mood/show-mood-dto.model";
import {ArtArgs} from "../../share/model/base/art-args.model";
import {ArtType} from "../../foot-mark/model/art-type.model";
import {SelectDiscussionCondition} from "../../share/model/discussion/select-discussion-condition";
import {NoticeArt} from "../../foot-mark/model/notice-art.model";


@Injectable()
export class MoodService extends BaseService{
  /**
   *  在心情组件和上传图片组件之间共享待上传图片数据
   * @type {Array}
   */
  public sharePreUploadImgs:string[]=[];
  constructor(private http:Http,private api:RedFruitApi,private artType:ArtType) {
    super()
  }

  /**
   * 点赞
   * @param noticeArt 点赞模型
   * @returns {Observable<R|T>}
   */
  updateThumbsUpUserIds(noticeArt:NoticeArt):Observable<boolean>{
    return this.http.put(this.api.MOOD_THUMBSUP,noticeArt).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 分页查询心情
   * @param condition 心情查询条件
   * @returns {Observable<R|T>} 分页的心情模型
   */
  selectMood(condition:SelectMoodCondition):Observable<PagedMood>{
    return this.http.get(this.api.MOOD+`${condition.byHalf}/${condition.pageIndex}/${condition.pageSize}`).
    map(res=>{
      let pagedMood:PagedMood= res.json().data;
      let moods:ShowMoodDto[]=pagedMood.content;
      //初始化动态参数
      for(let mood of moods){
        let args = new ArtArgs();
        args.discussionCount=mood.discussionCount;
        args.thumbsUpCount=mood.thumbsUpCount;
        args.thumbsUpAble=mood.thumbsUpAble;
        args.artType=this.artType.MOOD;
        args.artId = mood.moodId;
        args.artUserId=mood.mood.userId;
        args.showPaginator=false;
        args.original = mood.original;
        if(!args.original){//如果心情不是原创
          args.originalUserId = mood.originalUserId;
          args.originalArtId = mood.originalArtId;
        }
        //评论的查询参数
        args.selectDiscussionCondition = new SelectDiscussionCondition();
        args.selectDiscussionCondition.artId=args.artId;
        mood.artArgs=args;

        //通知动态参数
        if(mood.mood.imgs.length>0){
          args.firstArtImg = mood.mood.imgs[0];
        }

        args.artContent = mood.mood.content;
      }

      return pagedMood;
    }).catch(this.handleError);
  }
  /**
   * 插入心情
   * @param mood 心情模型
   * @returns {Observable<R|T>}
   */
  insertMood(mood:InsertMood):Observable<boolean>{
    return this.http.post(this.api.MOOD,mood).map(res=>res.json().data).catch(this.handleError);
  }
}
