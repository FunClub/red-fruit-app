import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {RedFruitApi} from "../../share/model/base/api.model";
import {Observable} from "rxjs/Observable";
import {Home} from "../model/home.model";
import {ArtArgs} from "../../share/model/base/art-args.model";
import {NoticeMessage} from "../../websocket/model/notice-message.model";

/**
 * home服务
 */
@Injectable()
export class HomeService extends BaseService{


  constructor(private http:Http,private api:RedFruitApi,public homeInfo:Home,private noticeMessage:NoticeMessage) {
    super();
  }

  /**
   * 初始化通知消息
   */
  initNoticeMessage(argsType:ArtArgs){

  }
  /**
   * 获取主页信息
   * @param userId 用户id
   * @returns {Observable<R|T>}
   */
  getHomeInfo():Observable<Home>{
    return this.http.get(this.api.HOME_INFO).map(res=>{
      this.homeInfo=res.json().data as Home;
      //初始化通知消息
      this.noticeMessage.sendNickname = this.homeInfo.nickname;
      this.noticeMessage.sendProfileImg = this.homeInfo.profileImg;
      this.noticeMessage.sendUserId = this.homeInfo.userId;
     return this.homeInfo;
    }).catch(this.handleError);
  }
  /**
   * 判断能否进入Home界面
   * @returns {Observable<R|T>}
   */
  canToHome(){
    return this.http.get(this.api.CAN_TO_HOME).map(res=>res.json().data).catch(this.handleError);
  }


}
