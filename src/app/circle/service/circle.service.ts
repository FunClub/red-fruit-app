import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {Post, SelectPostCondition, ShowPost} from "../model/post.model";
import {CircleApi} from "../model/circle-api.model";
import {Observable} from "rxjs/Observable";
import {PagedData} from "../../share/model/base/paged-data";
/**
 * 圈子服务
 */
@Injectable()
export class CircleService extends BaseService{

  constructor(private http:Http,private circleApi:CircleApi) { super()}

  /**
   * 查询帖子
   * @return {Observable<R|T>}
   * @param postId 帖子id
   */
  selectPost(postId:string):Observable<ShowPost>{
    return this.http.get(this.circleApi.POST(postId)).map(res=>res.json().data).catch(this.handleError);
  }

  /**
   * 查询帖子列表
   * @param select 查询条件
   * @return {Observable<R|T>}
   */
  selectPosts(select:SelectPostCondition):Observable<PagedData>{
    return this.http.post(this.circleApi.POSTS,select).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 插入帖子
   * @param post 帖子模型
   * @return {Observable<R|T>}
   */
  insertPost(post:Post):Observable<ShowPost>{
    return this.http.post(this.circleApi.ADD_POST,post).map(res=>res.json().data).catch(this.handleError);
  }

}
