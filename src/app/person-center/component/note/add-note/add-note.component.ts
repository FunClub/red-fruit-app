import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from "../../../../share/model/base/rf-editor-options.model";
import {Note} from "../../../model/note/note.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {NoteService} from "../../../service/note.service";
import {limit, noteType} from "../../../../share/model/base/static-data.model";
import {Router} from "@angular/router";
import {MdDialog} from "@angular/material";
import {PreviewNoteComponent} from "../preview-note/preview-note.component";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})export class AddNoteComponent implements OnInit {
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
  constructor(private api:RedFruitApi,private noteService:NoteService,private router:Router,private dialog:MdDialog) {
    this.editorOption = new RfEditorOptions();
    this.noteTypes=noteType;
    this.limitTypes = limit;
    this.note = new Note();
  }
  initEditor(){
    this.editorOption.heightMin=300;
    this.editorOption.enter="$.FroalaEditor.ENTER_P";
    this.editorOption.toolbarButtons=['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'];
    this.editorOption.imageEditButtons=['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'];
  }
  ngOnInit() {
    this.initEditor();
  }
  publishNote(){
    this.noteService.insertNote(this.note).subscribe(res=>{
      this.router.navigate(["home/person-center/note",res]);
    });
  }
  previewNote(){
    this.dialog.open(PreviewNoteComponent,{
      data:this.note
    })
  }
}
