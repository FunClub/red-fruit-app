import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {Note} from "../../../model/note/note.model";
import {EditorArgs} from "../../../../share/model/base/editor-args";

@Component({
  selector: 'app-preview-note',
  templateUrl: './preview-note.component.html',
  styleUrls: ['./preview-note.component.css']
})
export class PreviewNoteComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA)public editArgs:EditorArgs) {
    if(!editArgs.title){
      editArgs.title="未命名标题"
    }
    if(!editArgs.content){
      editArgs.content="暂无内容";
    }

  }

  ngOnInit() {

    window.onresize=()=>{}
  }
  getNoteHeight(){
    let height = window.innerHeight;
    return height*0.9-50;
  }
}
