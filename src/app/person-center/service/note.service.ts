import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {Note, ShowNote, ShowPagedNote} from "../model/note/note.model";
import {NoteApi} from "../model/note/note-api.model";
import {SelectCatalogNote} from "../../share/model/note/select-catalog-note";
import {Observable} from "rxjs/Observable";
import {ArtArgs} from "../../share/model/base/art-args.model";

@Injectable()
export class NoteService extends BaseService{

  constructor(private http:Http,private noteApi:NoteApi) {
    super();
  }

  /**
   * 更新日志
   * @param note 日志模型
   * @return {Observable<R|T>}
   */
  updateNote(note:Note):Observable<boolean>{
    return this.http.put(this.noteApi.NOTE,note).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 查询一篇日志
   * @param noteId 日志id
   * @return {Observable<R|T>}
   */
  selectNote(noteId:string):Observable<ShowNote>{
    return this.http.get(this.noteApi.SELECT_NOTE(noteId)).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 查询日志目录
   * @param select 查询条件
   * @return {Observable<R|T>}
   *
   */
  selectCatalogNote(select:SelectCatalogNote):Observable<ShowPagedNote>{
    return this.http.post(this.noteApi.SELECT_CATALOG_NOTE,select).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 插入日志
   * @param note 日志文档
   * @return {Observable<R|T>}
   */
  insertNote(note:Note){
    if(!note.title){
      note.title="未命名标题";
    }
    if(!note.content){
      note.content="暂无内容";
    }
    return this.http.post(this.noteApi.NOTE,note).map(res=>res.json().data).catch(this.handleError);
  }
}
