import { Injectable } from '@angular/core';
import {BaseService} from "../../share/service/base.service";
import {Http} from "@angular/http";
import {InsertMood} from "../model/insert-mood";
import {Observable} from "rxjs/Observable";
import {RedFruitApi} from "../../share/model/api.model";
import {SelectMoodCondition} from "../model/select-mood-condition.model";
import {PagedMood} from "../model/paged-mood";

@Injectable()
export class MoodService extends BaseService{
  /**
   *  在心情组件和上传图片组件之间共享待上传图片数据
   * @type {Array}
   */
  public sharePreUploadImgs:string[]=[];
  constructor(private http:Http,private api:RedFruitApi) {
    super()
  }

  selectMood(condition:SelectMoodCondition):Observable<PagedMood>{
    return this.http.get(this.api.MOOD+`${condition.byHalf}/${condition.pageIndex}/${condition.pageSize}`).
    map(res=>res.json().data as PagedMood).catch(this.handleError);
  }
  /**
   * 插入心情
   * @param mood 心情模型
   * @returns {Observable<R|T>}
   */
  insertMood(mood:InsertMood):Observable<boolean>{
    return this.http.post(this.api.MOOD,mood).map(res=>res.json().data).catch(this.handleError);
  }
}
