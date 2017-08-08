import { Injectable } from '@angular/core';
import {BaseService} from "../../share/service/base.service";
import {Http} from "@angular/http";
import {InsertMood} from "../model/insert-mood";
import {Observable} from "rxjs/Observable";
import {RedFruitApi} from "../../share/model/base/api.model";
import {SelectMoodCondition} from "../model/select-mood-condition.model";
import {PagedMood} from "../model/paged-mood";
import {ShowMoodDto} from "../model/show-mood-dto.model";
import {ArtArgs} from "../../share/model/base/art-args.model";
import {ArtType} from "../../share/model/art-opreation/art-type.model";
import {SelectDiscussionCondition} from "../../share/model/discussion/select-discussion-condition";


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
   * @param moodId 心情ID
   * @returns {Observable<R|T>}
   */
  updateThumbsUpUserIds(moodId:string):Observable<boolean>{
    return this.http.put(this.api.MOOD_THUMBSUP(moodId),null).map(res=>res.json().data).catch(this.handleError);
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
        args.artId=mood.moodId;
        //评论的查询参数
        args.selectDiscussionCondition = new SelectDiscussionCondition();
        mood.artArgs=args;
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
