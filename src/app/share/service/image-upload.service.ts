import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Observable} from "rxjs/Observable";
import {RedFruitApi} from "../model/api.model";

/**
 * 图片上传相关服务
 */
@Injectable()
export class ImageUploadService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {super();}

  /**
   * 上传心情照片
   * @param files 心情文件路径数组
   * @returns {Observable<R|T>}
   */
  uploadMoodImg(files:any):Observable<string[]>{
    return this.http.put(this.api.MOOD_IMG,files).map(res=>res.json().data).catch(this.handleError);
  }

  /**
   * 删除心情照片
   * @param paths 心情文件路径数组
   * @returns {Observable<R|T>}
   */
  deleteMoodImg(paths:string[]):Observable<boolean>{
    return this.http.patch(this.api.MOOD_IMG,paths).map(res=>res.json().data).catch(this.handleError);
  }
}
