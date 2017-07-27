import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {RedFruitApi} from "../../share/model/api.model";

/**
 * home服务
 */
@Injectable()
export class HomeService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {
    super();
  }

  /**
   * 判断能否进入Home界面
   * @returns {Observable<R|T>}
   */
  canToHome(){
    return this.http.get(this.api.CAN_TO_HOME).map(res=>res.json().data).catch(this.handleError);
  }


}
