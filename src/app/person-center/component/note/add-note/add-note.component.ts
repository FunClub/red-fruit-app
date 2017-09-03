import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RfEditorOptions} from "../../../../share/model/base/rf-editor-options.model";
import {Note, ShowNote} from "../../../model/note/note.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {NoteService} from "../../../service/note.service";
import {limit, noteType} from "../../../../share/model/base/static-data.model";
import {Router} from "@angular/router";
import {MdDialog} from "@angular/material";
import {PreviewNoteComponent} from "../preview-note/preview-note.component";
import {EditorArgs} from "../../../../share/model/base/editor-args";
import {EditNoteArgs} from "../../../model/note/edit-note-args";
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})export class AddNoteComponent implements OnInit {
  @Input()
  editNoteArgs:EditNoteArgs;
  /**
   * 日志更新事件
   */
  @Output()
  noteUpdate:EventEmitter<boolean>;

  /**
   * 日志类型
   */
  noteTypes:any;

  /**
   * 限制类型
   */
  limitTypes:any;
  /**
   * 日志模型
   */
  note:Note;

  ngBusy:any;

  editorArgs:EditorArgs;

  constructor(private api:RedFruitApi,private noteService:NoteService,private router:Router,private dialog:MdDialog

  ) {
    this.editorArgs = new EditorArgs();
    this.editorArgs.type="日志";
    this.noteTypes=noteType;
    this.limitTypes = limit;
    this.note = new Note();
    this.noteUpdate = new EventEmitter();
  }

  ngOnInit() {
    if(!this.editNoteArgs.isAdd){
      this.initEditNote();
    }
  }

  /**
   * 初始化日志参数(编辑日志才有)
   */
  initEditNote(){
    let note = this.editNoteArgs.note;
    this.editorArgs.title=note.title;
    this.editorArgs.content = note.content;
    this.note.limit=note.limit;
    this.note.type=note.type;
    this.note.noteId =note.noteId;
  }
  /**
   * 发布日志
   */
  publishNote(){
   this.getEditData();
    this.noteService.insertNote(this.note).subscribe(res=>{
      this.router.navigate(["home/person-center/note",res]);
    });
  }

  /**
   * 预览日志
   */
  previewNote(){
    this.dialog.open(PreviewNoteComponent,{
      data:this.editorArgs
    })
  }

  /**
   * 获取编辑器数据
   */
  getEditData(){
    this.note.title = this.editorArgs.title;
    this.note.content = this.editorArgs.content;
  }
  /**
   * 保存修改的日志
   * @param close
   */
  saveNote(close:HTMLButtonElement){
    this.getEditData();
    this.ngBusy=this.noteService.updateNote(this.note).subscribe(res=>{
      if(res){
        let note = this.editNoteArgs.note;
        note.title=this.note.title;
        note.content=this.note.content;
        note.limit=this.note.limit;
        note.type=this.note.type;
        this.noteUpdate.emit(true);
      }else{
        this.noteUpdate.emit(false);
      }
    })
  }
  caogao(){

  }
}
