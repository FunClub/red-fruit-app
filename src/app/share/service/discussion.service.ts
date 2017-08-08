import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {RedFruitApi} from "../model/base/api.model";
import {InsertDiscussion} from "../model/discussion/insert-discussion.model";
import {Observable} from "rxjs/Observable";
import {SelectDiscussionCondition} from "../model/discussion/select-discussion-condition";
import {ShowPagedDiscussion} from "../model/discussion/show-paged-discussion.model";
import {InsertSubDiscussion} from "../model/discussion/insert-sub-discussion";
import {ShowSubDiscussion} from "../model/discussion/show-sub-discussion.model";
import {ShowParentDiscussion} from "../model/discussion/show-parent-discussion.model";
/**
 * 评论服务
 */
@Injectable()
export class DiscussionService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {
    super();

  }

  /**
   * 删除评论
   * @param discussionId
   * @returns {Observable<R|T>}
   */
  deleteParentDiscussion(discussionId:string){
    return this.http.delete(this.api.DELETE_PARENT_DISCUSSION(discussionId)).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 插入子评论
   * @param subDiscussion 子评论模型
   * @returns {Observable<R|T>}
   */
  insertSubDiscussion(subDiscussion:InsertSubDiscussion):Observable<ShowSubDiscussion>{
    return this.http.post(this.api.SUB_DISCUSSION,subDiscussion).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 点赞
   * @param discussionId
   * @returns {Observable<R|T>}
   */
  updateThumbsUpUserIds(discussionId:string){
    return this.http.put(this.api.DISCUSSION_THUMBSUP(discussionId),null).map(res=>res.json().date).catch(this.handleError);
  }
  /**
   * 插入父级评论
   * @param discussion
   * @returns {Observable<R|T>}
   */
  insertParentDiscussion(discussion:InsertDiscussion):Observable<ShowParentDiscussion>{
    return this.http.post(this.api.PARENT_DISCUSSION,discussion).map(res=>res.json().data).catch(this.handleError);
  }

  /**
   * 查询评论
   * @param select 查询条件
   * @returns {Observable<R|T>}
   */
  selectDiscussion(select:SelectDiscussionCondition):Observable<ShowPagedDiscussion>{
    return this.http.post(this.api.DISCUSSION,select).map(res=>res.json().data).catch(this.handleError);
  }
}
