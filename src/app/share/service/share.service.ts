import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {RedFruitApi} from "../model/base/api.model";
import {Observable} from "rxjs/Observable";
import {ShowCard} from "../model/base/show-card.model";
import {AttentionUser} from "../model/base/attention-user.model";

@Injectable()
export class ShareService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {
    super();
  }

  /**
   * 查询被关注用户信息
   * @return {Observable<R|T>}
   */
  selectAttentionUser(){
    return this.http.get(this.api.ATTENTION_INFO).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 取消关注用户
   * @param userId 用户id
   */
  cancelAttention(userId:string):Observable<boolean>{
    return this.http.delete(this.api.ATTENTION_USER(userId)).map(res=>res.json().data).catch(this.handleError);
  }

  /**
   * 关注用户
   * @param userId 用户id
   * @return {Observable<R|T>}
   */
  attentionUser(userId:string):Observable<boolean>{
    return this.http.post(this.api.ATTENTION_USER(userId),null).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 查询名片
   * @param userId 用户id
   * @return {Observable<R|T>}
   */
  selectCard(userId:string):Observable<ShowCard>{
    return this.http.get(this.api.CARD(userId)).map((res)=>res.json().data).catch(this.handleError);
  }

}
