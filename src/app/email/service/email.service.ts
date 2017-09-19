import { Injectable } from '@angular/core';
import {BaseService} from "../../share/service/base.service";
import {Http} from "@angular/http";
import {
  AddEmailContent, EmailPagedData, InsertEmail, SelectEmailCatalog, ShowEmail,
  ShowEmailCatalog
} from "../model/email.model";
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
   * 删除邮件
   * @param emailCatalogs 邮件目录
   * @return {Observable<R|T>}
   */
  deleteEmail( emailCatalogs:ShowEmailCatalog[]){
    let ids = []; console.log(emailCatalogs)
    for (let catalog of emailCatalogs){
      console.log(emailCatalogs)
      if(catalog.selected){
        ids.push(catalog.emailId);
      }
    }
    return this.http.post(this.emailApi.DELETE_EMAIL,ids).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 添加邮件内容
   * @param content 内容模型
   * @return {Observable<R|T>}
   */
  addEmailContent(content:AddEmailContent):Observable<boolean>{
    return this.http.put(this.emailApi.ADD_EMAIL_CONTENT,content).map(res=>res.json().data).catch(this.handleError);
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
    return this.http.post(this.emailApi.CATALOG,select).map(res=>{
      let data = res.json().data as EmailPagedData;
      let emailCatalogs=data.content as ShowEmailCatalog[];
      for(let catalog of emailCatalogs){
        catalog.selected=false;
      }
      return data;
    }).catch(this.handleError);
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
