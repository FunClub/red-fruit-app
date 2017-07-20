import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class BaseService {

  constructor() { }

  /**
   * 错误处理
   * @param error
   * @returns {any}
   */
  protected handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      let body = error.json() || '';
      let err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
