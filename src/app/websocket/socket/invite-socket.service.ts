import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {InviteMessage} from "../model/invite-message.model";

@Injectable()
export class InviteSocketService {
  private url:string;
  private ws:WebSocket;
  constructor() {
  }
  connection(userId:string):Observable<any>{
    this.url="ws://localhost/invite/"+userId;
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
