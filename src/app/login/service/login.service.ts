import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {RedFruitApi} from "../../share/model/api.model";
import {BaseService} from "../../share/service/base.service";
import {ValidationErrors} from "@angular/forms";
import {InviteUser} from "../model/invite-user.model";
import {InviteMessage} from "../../websocket/model/invite-message.model";

/**
 * 登录服务
 */
@Injectable()
export class LoginService extends BaseService{
  /**
   * 保存登陆和邀请的头部标题
   */
  headerTitle:string;

  /**
   * 用户id，便于home模块使用
   */
  userId:string;
  /**
   * 保存在提示框上显示的邀请信息
   */
  inviteMessage:InviteMessage[];
  constructor(private http: Http,private api:RedFruitApi) {
    super();
  }

  /**
   * 删除邀请信息
   * @param id
   * @returns {Observable<R|T>}
   */
  deleteInvitation(id:string){
    return this.http.get(this.api.DELETE_INVITATION_REST(id)).map(res=>res.json()).catch(this.handleError);
  }
  /**
   * 判断待邀请的用户是否能被邀请
   * @param userId 用户id
   * @returns {Observable<R>}
   */
  canInviteAble(userId:string):Observable<ValidationErrors | null>{
      return this.http.get(this.api.CAN_INVITE_ABLE(userId)).map(res=>{
        let body = res.json();
       return body.code==200?null:{"canInviteAble":"邀请失败"}
      });
  }
  /**
   * 判断用户能否进入邀请另一半组件
   * @returns {Observable<R|T>}
   */
  canToInvite():Observable<boolean>{
    return this.http.get(this.api.TO_INVITE_ABLE).map(res=>{
      return res.json().data;
    }).catch(this.handleError);
  }

  /**
   * 获取邀请另一半时的用户信息
   * @returns {Observable<R|T>}
   */
  getInviteUserInfo():Observable<InviteUser>{
    return this.http.get(this.api.INVITE_USER).map(res=>res.json().data as InviteUser).catch(this.handleError);
  }
  login(user:any):Observable<any>{
    return this.http.post(this.api.LOGIN,user).map(res=>{
      let result = res.json();
      if(result.data!=null){
        this.userId=result.data.userId;
      }
      return result;
    }).catch(this.handleError);
  }
}
