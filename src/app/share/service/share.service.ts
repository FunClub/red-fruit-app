import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {RedFruitApi} from "../model/base/api.model";
import {Observable} from "rxjs/Observable";
import {ShowCard} from "../model/base/show-card.model";

@Injectable()
export class ShareService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {
    super();
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
