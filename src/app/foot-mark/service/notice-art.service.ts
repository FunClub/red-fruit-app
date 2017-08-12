import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {RedFruitApi} from "../../share/model/base/api.model";
import {BaseService} from "../../share/service/base.service";
import {SelectNoticeCondition} from "../model/select-notice-condition.model";
import {Observable} from "rxjs/Observable";
import {ShowPagedNotice} from "../model/show-paged-notice.model";
import {ShowNoticeDto} from "../model/show-notice-dto.model";

@Injectable()
export class NoticeArtService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {super(); }

  /**
   * 查询动态通知
   * @param condition 查询条件
   * @returns {Observable<R|T>}
   */
  selectNoticeArt(condition:SelectNoticeCondition):Observable<ShowPagedNotice>{
    return this.http.post(this.api.NOTICE_ART,condition).map(res=>{
      let pageNotice:ShowPagedNotice=res.json().data
      let notices:ShowNoticeDto[] = pageNotice.content;
      for(let notice of notices){
        notice.firstArtImg=this.api.IMAGE_PREFIX+notice.firstArtImg+this.api.UPLOAD_MOOD_NARROW_STYLE
      }
      return pageNotice;
    }).catch(this.handleError);
  }

}
