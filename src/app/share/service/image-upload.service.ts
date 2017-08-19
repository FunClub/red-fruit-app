import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Observable} from "rxjs/Observable";
import {RedFruitApi} from "../model/base/api.model";

/**
 * 图片上传相关服务
 */
@Injectable()
export class ImageUploadService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {super();}

  /**
   * 上传照片
   * @param files 文件路径数组
   * @param folder oss 文件夹名称
   * @returns {Observable<R|T>}图片路径数组
   */
  uploadImg(files:any,folder:string):Observable<string[]>{
    return this.http.put(this.api.IMG(folder),files).map(res=>res.json().data).catch(this.handleError);
  }

  /**
   * 删除照片
   * @param paths 文件路径数组
   * @param bucketName oss bucket名称
   * @returns {Observable<R|T>}
   */
  deleteImg(paths:string[]):Observable<boolean>{
    return this.http.patch(this.api.IMG(""),paths).map(res=>res.json().data).catch(this.handleError);
  }
}
