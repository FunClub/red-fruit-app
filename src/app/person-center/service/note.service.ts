import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {Note, ShowPagedNote} from "../model/note/note.model";
import {NoteApi} from "../model/note/note-api.model";
import {SelectCatalogNote} from "../../share/model/note/select-catalog-note";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NoteService extends BaseService{

  constructor(private http:Http,private noteApi:NoteApi) {
    super();
  }

  selectCatalogNote(select:SelectCatalogNote):Observable<ShowPagedNote>{
    return this.http.post(this.noteApi.SELECT_NOTE,select).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 插入日志
   * @param note 日志文档
   * @return {Observable<R|T>}
   */
  insertNote(note:Note){
    return this.http.post(this.noteApi.NOTE,note).map(res=>res.json()).catch(this.handleError);
  }
}
