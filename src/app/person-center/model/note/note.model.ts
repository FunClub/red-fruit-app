

import {ArtDto} from "../../../share/model/base/art-dto.model";
import {ArtArgs} from "../../../share/model/base/art-args.model";
/**
 * 插入日志的模型
 */
export class Note {
  noteId:string;
  title:string;
  content:string;
  type:string;
  limit:number;
  original:boolean;
  constructor() {
    this.limit=1;
    this.type="日志";
    this.original=true;
  }
}
/**
 * 分好页的日志目录模型
 */
export  class ShowPagedNote{
  totalElements:number;
  content:ShowCatalogNote[];
}

/**
 * 单一日志目录模型
 */
export  class  ShowCatalogNote extends ArtDto{
  noteId:string;
  nickname:string;
  profile:string;
  date:string;
  title:string;
  type:string;
  limit:number;
}
/**
 * 显示一条日志的模型
 */
export  class ShowNote extends ShowCatalogNote{
  content:string;
}
