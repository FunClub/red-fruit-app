import {Note, ShowNote} from "./note.model";
/**
 * 日志编辑器参数,
 * 判断是编辑日志还是添加日志
 */
export class EditorNoteArgs {
  isAdd:boolean;
  note:Note;
}
