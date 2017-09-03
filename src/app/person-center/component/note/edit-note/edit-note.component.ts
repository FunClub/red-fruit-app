import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";

import {ToastsManager} from "ng2-toastr";
import {EditNoteArgs} from "../../../model/note/edit-note-args";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public editorNoteArgs:EditNoteArgs,private toastsManager:ToastsManager) {

  }

  ngOnInit() {
  }
  noteUpdate(event,close:HTMLButtonElement){
    if(event){
      this.toastsManager.success("日志修改成功","修改结果");
      close.click();
    }else {
      this.toastsManager.success("日志修改失败,请重试","修改结果")
    }
  }
}
