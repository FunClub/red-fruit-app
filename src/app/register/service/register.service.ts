import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {ValidationErrors} from "@angular/forms";
import {RedFruitApi} from "../../share/model/api.model";
import {BaseService} from "../../share/service/base.service";
@Injectable()
export class RegisterService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {
    super()
  }

  register(registerDto:any):Observable<boolean>{
    return this.http.post(this.api.REGISTER,registerDto).map(res=>res.json().data!=null).catch(this.handleError);
  }
  /**
   *验证验证码的正确性
   * @param code 待验证验证码
   * @returns {Observable<R|T>} 可观察的验证信息
   * 返回null数据则表示表单控件验证通过，反之亦然
   */
  verificationCodeActually(code:string):Observable<ValidationErrors|null>{
    return this.http.get(`share/${code}/verificationCode`).map(res=>{
      let body = res.json();
      return body.data ? null:{"verificationCodeActually":"验证码错误"}
    }).catch(this.handleError)
  }

  /**
   *验证账号是否可以注册
   * @param account 待验证账号
   * @returns {Observable<R|T>} 可观察的验证信息
   * 返回null数据则表示表单控件验证通过，反之亦然
   */
  canRegisterAble(account:string):Observable<ValidationErrors|null>{
    return this.http.get(`register/${account}/account`).map(res=>{
      let body = res.json();
      return body.data ? null:{"canRegisterAble":"账号已被注册"}
    }).catch(this.handleError);
  }

}
