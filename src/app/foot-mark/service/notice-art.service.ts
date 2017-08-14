import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {RedFruitApi} from "../../share/model/base/api.model";
import {BaseService} from "../../share/service/base.service";
import {SelectNoticeCondition} from "../model/select-notice-condition.model";
import {Observable} from "rxjs/Observable";
import {ShowPagedNotice} from "../model/show-paged-notice.model";
import {ShowNoticeDto} from "../model/show-notice-dto.model";
import {ArtArgs} from "../../share/model/base/art-args.model";
import {NoticeArt} from "../model/notice-art.model";
import {NoticeArtType} from "../model/notice-art-type";
import {DeleteNoticeArt} from "../model/delete-notice-art.model";

@Injectable()
export class NoticeArtService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi,private noticeType:NoticeArtType) {super(); }

  /**
   * 删除动态通知
   * @param deleteNotice 删除动态通知模型
   * @returns {Observable<R|T>}
   */
  deleteNoticeArt(deleteNotice:DeleteNoticeArt):Observable<boolean>{
    return this.http.patch(this.api.NOTICE_ART,deleteNotice).map(res=>res.json()).catch(this.handleError);
  }
  /**
   * 查询动态通知
   * @param condition 查询条件
   * @returns {Observable<R|T>}
   */
  selectNoticeArt(condition:SelectNoticeCondition):Observable<ShowPagedNotice>{
    return this.http.post(this.api.NOTICE_ART,condition).map(res=>res.json().data).catch(this.handleError);
  }

  /**
   * 初始化通知动态参数
   * @param artArgs 动态参数
   * @returns {NoticeArt}通知动态
   */
  initNoticeArtData(artArgs:ArtArgs):NoticeArt{
    let noticeArt:NoticeArt = new NoticeArt();
    if(!artArgs.original){
      noticeArt.originalArtId =artArgs.originalArtId;
      noticeArt.originalUserId =artArgs.originalUserId;
    }
    noticeArt.original=artArgs.original;
    noticeArt.artId=artArgs.artId;
    noticeArt.artUserId = artArgs.artUserId;
    noticeArt.noticeArtUserId = artArgs.artUserId;
    noticeArt.artType=artArgs.artType;
    noticeArt.artContent = artArgs.artContent;
    noticeArt.firstArtImg = artArgs.firstArtImg;

    return noticeArt;
  }
}
