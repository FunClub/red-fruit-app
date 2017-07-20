import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {RedFruitApi} from "../../share/model/api.model";
import {BaseService} from "../../share/service/base.service";

/**
 * 登录服务
 */
@Injectable()
export class LoginService extends BaseService{

  constructor(private http: Http,private api:RedFruitApi) {
    super();
  }

  login(user:any):Observable<boolean>{
    return this.http.post(this.api.LOGIN,user).map(res=>{
      let result = res.json();
      return result.code==200;
    }).catch(this.handleError);
  }
}
