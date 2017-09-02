import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RfEditorOptions} from "../../../../share/model/base/rf-editor-options.model";
import {Note, ShowNote} from "../../../model/note/note.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {NoteService} from "../../../service/note.service";
import {limit, noteType} from "../../../../share/model/base/static-data.model";
import {Router} from "@angular/router";
import {MdDialog} from "@angular/material";
import {PreviewNoteComponent} from "../preview-note/preview-note.component";
import {EditorNoteArgs} from "../../../model/note/editor-note-args";
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})export class AddNoteComponent implements OnInit {

  /**
   * 日志编辑器参数,
   */
  @Input()
  editorNoteArgs:EditorNoteArgs;

  /**
   * 日志更新事件
   */
  @Output()
  noteUpdate:EventEmitter<boolean>;
  /**
   * 编辑器配置
   */
  editorOption:RfEditorOptions;

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


  constructor(private api:RedFruitApi,private noteService:NoteService,private router:Router,private dialog:MdDialog

  ) {
    this.editorOption = new RfEditorOptions();
    this.noteTypes=noteType;
    this.limitTypes = limit;
    this.note = new Note();

    this.noteUpdate = new EventEmitter();
  }
  initEditor(){
    this.editorOption.heightMin=300;
    this.editorOption.enter="$.FroalaEditor.ENTER_P";
    this.editorOption.toolbarButtons=['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'];
    this.editorOption.imageEditButtons=['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'];
  }
  ngOnInit() {
    this.initEditor();
    if(!this.editorNoteArgs.isAdd){
      this.initAddNote();
    }
  }

  /**
   * 初始化添加日志参数(编辑日志才有)
   */
  initAddNote(){
    let note = this.editorNoteArgs.note;
    this.note.title=note.title;
    this.note.content = note.content;
    this.note.limit=note.limit;
    this.note.type=note.type;
    this.note.noteId =note.noteId;
  }
  /**
   * 发布日志
   */
  publishNote(){
    this.noteService.insertNote(this.note).subscribe(res=>{
      this.router.navigate(["home/person-center/note",res]);
    });
  }

  /**
   * 预览日志
   */
  previewNote(){
    this.dialog.open(PreviewNoteComponent,{
      data:this.note
    })
  }

  /**
   * 保存修改的日志
   * @param close
   */
  saveNote(close:HTMLButtonElement){
    this.ngBusy=this.noteService.updateNote(this.note).subscribe(res=>{
      if(res){
        let note = this.editorNoteArgs.note;
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
