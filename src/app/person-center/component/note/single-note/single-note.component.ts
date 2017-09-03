import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../../../service/note.service";
import {ShowNote} from "../../../model/note/note.model";
import {ArtArgs} from "../../../../share/model/base/art-args.model";
import {ArtType} from "../../../../foot-mark/model/art-type.model";
import {noteType} from "../../../../share/model/base/static-data.model";
import {SelectDiscussionCondition} from "../../../../share/model/discussion/select-discussion-condition";

import {MdDialog} from "@angular/material";
import {EditNoteComponent} from "../edit-note/edit-note.component";
import {EditNoteArgs} from "../../../model/note/edit-note-args";

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {
  /**
   * 日志模型
   */
  showNote:ShowNote;

  /**
   * 动态参数
   */
  artArgs:ArtArgs;

  /**
   * ngBusy订阅
   */
  ngBusy:any;

  /**
   * 日志编辑器参数,
   */
  editorNoteArgs:EditNoteArgs;
  constructor(private activatedRoute:ActivatedRoute,private noteService:NoteService,private artType:ArtType,private dialog:MdDialog) {
    this.showNote = new ShowNote();
    this.showNote.content="";

    //初始化日志编辑器参数,
    this.editorNoteArgs = new EditNoteArgs();
    this.editorNoteArgs.isAdd=false;
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['noteId'];
   this.ngBusy= this.noteService.selectNote(id).subscribe(res=>{
      if(res){//如果查到了日志
        this.showNote=res;
        this.initNoteArtArgs();
        this.editorNoteArgs.note=this.showNote;
      }
    });
  }
  editNote(){
    this.dialog.open(EditNoteComponent,{
      data: this.editorNoteArgs
    });
  }
  initNoteArtArgs(){
    this.artArgs = new ArtArgs();
    this.artArgs.discussionCount=this.showNote.discussionCount;
    this.artArgs.thumbsUpCount=this.showNote.thumbsUpCount;
    this.artArgs.thumbsUpAble=this.showNote.thumbsUpAble;
    this.artArgs.artType=this.artType.NOTE;
    this.artArgs.artId = this.showNote.noteId;
    this.artArgs.artUserId=this.showNote.userId;
    this.artArgs.showPaginator=true;
    this.artArgs.original = this.showNote.original;
    if(!this.artArgs.original){//如果心情不是原创
      this.artArgs.originalUserId = this.showNote.originalUserId;
      this.artArgs.originalArtId = this.showNote.originalArtId;
    }
    //评论的查询参数
    this.artArgs.selectDiscussionCondition = new SelectDiscussionCondition();
    this.artArgs.selectDiscussionCondition.artId=this.artArgs.artId;

    //通知动态参数
    this.artArgs.artContent = this.showNote.title;
  }
}
