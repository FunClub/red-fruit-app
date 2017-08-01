import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "./base.service";
import {Observable} from "rxjs/Observable";
import {RedFruitApi} from "../model/api.model";

@Injectable()
export class ImageUploadService extends BaseService{

  constructor(private http:Http,private api:RedFruitApi) {super();}

  uploadMoodImg(files:any):Observable<string[]>{
    return this.http.put(this.api.MOOD_IMG,files).map(res=>res.json().data).catch(this.handleError);
  }

  deleteMoodImg(paths:string[]):Observable<boolean>{
    return this.http.patch(this.api.MOOD_IMG,paths).map(res=>res.json().data).catch(this.handleError);
  }
}
