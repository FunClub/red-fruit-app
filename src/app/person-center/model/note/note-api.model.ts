/**
 * 日志api
 */
export class NoteApi {
  /**
   * 查询日志
   * @param noteId 日志id
   * @return {string}
   * @constructor
   */
  SELECT_NOTE(noteId:string){
    return `note/${noteId}`;
  }
  /**
   * 查询日志目录
   * @type {string}
   */
  SELECT_CATALOG_NOTE:string="note/select";
  /**
   * 添加日志
   * @type {string}
   */
  NOTE:string="note/"
}
