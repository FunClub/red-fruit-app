import {Note, ShowNote} from "../../../person-center/model/note/note.model";
/**
 * 编辑器参数,
 */
export class EditorArgs {
  title:string;
  content:string;
  /**
   * 编辑是什么内容
   */
  type:string;
  constructor() {
  }
}
