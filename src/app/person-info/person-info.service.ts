import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {RedFruitApi} from "../share/model/api.model";
import {BaseInfo} from "./model/base-info";
import {BaseService} from "../share/service/base.service";
import {Observable} from "rxjs/Observable";

/**
 * 用户基本资料服务
 */
@Injectable()
export class PersonInfoService extends BaseService{
  /**
   * 用户基本资料共享
   */
  personBaseInfo:BaseInfo;

  constructor(private http:Http,private api:RedFruitApi) {super() }

  /**
   * 更新用户头像信息
   * @param profileInfo
   * @returns {Observable<R|T>}
   */
  updateProfileImg(profileInfo:any):Observable<boolean>{
    return this.http.put(this.api.UPDATE_PROFILE,profileInfo).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 修改用户基本资料
   * @param userInfo 待修改的用户数据
   * @returns {Observable<R|T>} true则代表修改成功
   */
  updateUserBaseInfo(userInfo:any):Observable<boolean>{
    return this.http.put(this.api.USER_BASE_INFO,userInfo).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 查询用户的基本资料
   * @returns {Observable<R|T>} 用户基本资料模型
   */
  selectUserBaseInfo():Observable<BaseInfo>{
    return this.http.get(this.api.USER_BASE_INFO).map(res=>res.json().data).catch(this.handleError);
  }
}
