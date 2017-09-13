import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import {BaseService} from "../../share/service/base.service";
import {Observable} from "rxjs/Observable";
import {ChatApi} from "../component/model/chat-api.model";
import {ShowChat} from "../component/model/show-chat.model";


@Injectable()
export class ChatService extends BaseService{
  private url:string;
  private ws:WebSocket;
  constructor(private http:Http,private chatApi:ChatApi) {super() }

  /**
   * 查询聊天
   * @return {Observable<R|T>}
   */
  selectChat():Observable<ShowChat[]>{
    return this.http.get(this.chatApi.CHAT).map(res=>res.json().data).catch(this.handleError);
  }
  connection(url:string):Observable<any>{
    this.url=url;
    this.ws=this.createSocket();

    return new Observable(observer=>{
      this.ws.onmessage=(ev: MessageEvent)=>observer.next(JSON.parse(ev.data));
    });
  }
  createSocket(){
    if ('WebSocket' in window) {
      return this.ws = new WebSocket(this.url);
    } else{
      alert('WebSocket is not supported by this browser.');
      return;
    }
  }
  sendMessage(message:any){
    this.ws.send(JSON.stringify(message));
  }
}
