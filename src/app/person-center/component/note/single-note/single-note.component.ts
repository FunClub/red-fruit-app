import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../../../service/note.service";
import {ShowNote} from "../../../model/note/note.model";
import {ArtArgs} from "../../../../share/model/base/art-args.model";
import {ArtType} from "../../../../foot-mark/model/art-type.model";
import {noteType} from "../../../../share/model/base/static-data.model";
import {SelectDiscussionCondition} from "../../../../share/model/discussion/select-discussion-condition";

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {
  showNote:ShowNote;
  artArgs:ArtArgs;
  constructor(private activatedRoute:ActivatedRoute,private noteService:NoteService,private artType:ArtType) {
    this.showNote = new ShowNote();
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['noteId'];
    this.noteService.selectNote(id).subscribe(res=>{
      if(res){//如果查到了日志
        this.showNote=res;
        this.initNoteArtArgs();
      }
    });
  }
  initNoteArtArgs(){
    this.artArgs = new ArtArgs();
    this.artArgs.discussionCount=this.showNote.discussionCount;
    this.artArgs.thumbsUpCount=this.showNote.thumbsUpCount;
    this.artArgs.thumbsUpAble=this.showNote.thumbsUpAble;
    this.artArgs.artType=this.artType.NOTE
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
