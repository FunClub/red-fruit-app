import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageUploadService extends BaseService{

  constructor(private http:Http) {super();}

  uploadMoodImg(files:any):Observable<string[]>{
    return this.http.post("share/upload/mood-img",files).map(res=>res.json().data).catch(this.handleError);
  }
}
