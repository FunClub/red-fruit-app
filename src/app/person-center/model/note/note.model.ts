

/**
 * 插入日志的模型
 */
export class Note {
  title:string;
  content:string;
  type:string;
  limit:number;

  constructor() {
    this.limit=1;
    this.type="心情";
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
export  class  ShowCatalogNote{
  noteId:string;
  nickname:string;
  profile:string;
  date:string;
  title:string;
  type:string;
  discussionCount:number;
  thumbsUpCount:number;
  limit:number;
}
