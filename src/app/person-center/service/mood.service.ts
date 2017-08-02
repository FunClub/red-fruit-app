import { Injectable } from '@angular/core';
import {BaseService} from "../../share/service/base.service";
import {Http} from "@angular/http";

@Injectable()
export class MoodService extends BaseService{
  /**
   *  在心情组件和上传图片组件之间共享待上传图片数据
   * @type {Array}
   */
  public sharePreUploadImgs:string[]=[];
  constructor(private http:Http) {
    super()
  }

}
