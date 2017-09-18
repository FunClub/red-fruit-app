import { Injectable } from '@angular/core';
import {BaseService} from "../../share/service/base.service";
import {Http} from "@angular/http";
import {EmailPagedData, InsertEmail, SelectEmailCatalog, ShowEmail, ShowEmailCatalog} from "../model/email.model";
import {Observable} from "rxjs/Observable";
import {EmailApi} from "../model/email-api.model";
import {AttentionUser} from "../../share/model/base/attention-user.model";
import {PagedData} from "../../share/model/base/paged-data";

@Injectable()
export class EmailService extends BaseService{

  constructor(private http:Http,private emailApi:EmailApi) {
    super();
  }

  /**
   * 查询一个邮件
   * @param emailId 邮件id
   * @return {Observable<R|T>}
   */
  selectEmail(emailId:string):Observable<ShowEmail>{
    return this.http.get(this.emailApi.SELECT_EMAIL(emailId)).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 查询日志目录
   * @param select 查询条件
   * @return {Observable<R|T>}
   */
  selectEmailCatalog(select:SelectEmailCatalog):Observable<EmailPagedData>{
    return this.http.post(this.emailApi.CATALOG,select).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 查询收件人信息
   * @param userId 用户id
   * @return {Observable<R|T>}
   */
  selectReceivedUser(userId:string):Observable<AttentionUser>{
    return this.http.get(this.emailApi.RECEIVE_USER(userId)).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 插入邮件
   * @param email 邮件模型
   * @return {Observable<R|T>}
   */
  insertEmail(email:InsertEmail):Observable<boolean>{
    return this.http.post(this.emailApi.INSERT_EMAIL,email).map(res=>res.json().data).catch(this.handleError);
  }
}
