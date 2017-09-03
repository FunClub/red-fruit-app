import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {NoteService} from "../../../service/note.service";
import {MdDialog} from "@angular/material";
import {SelectCatalogNote} from "../../../../share/model/note/select-catalog-note";
import {PageRequest} from "../../../../share/model/base/page-request.model";
import {ShowPagedNote, Note} from "../../../model/note/note.model";
import {NgProgressService} from "ngx-progressbar";
import {EditNoteArgs} from "../../../model/note/edit-note-args";

declare let $:any;
@Component({
  selector: 'app-catalog-note-list',
  templateUrl: './catalog-note-list.component.html',
  styleUrls: ['./catalog-note-list.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-50px)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(5px)',  offset: 0.5}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)',offset:0}),
          style({opacity: 0.5, transform: 'translateY(5px)',offset:0}),
          style({opacity: 0, transform: 'translateY(-50px)',offset:0})
        ]))
      ])
    ]),
    trigger('flyXInOutFromRight', [
      transition('void => *', [
        animate("500ms",keyframes([
          style({opacity: 0, transform: 'translateX(-5%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateX(-5px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),

    ]),
  ]
})
export class CatalogNoteListComponent implements OnInit {
  /**
   * 是否显示写日志div
   */
  showWriteNote:boolean;
  /**
   * 查询日志目录条件
   */
  selectCondition:SelectCatalogNote;

  /**
   * 分好页的日志目录模型
   */
  pagedNote:ShowPagedNote;

  /**
   * 每页数量配置
   * @type {[number,number,number,number]}
   */
  pageSizeOptions = [5, 10, 25, 100];

  /**
   * 日志编辑器参数,
   */
  editorNoteArgs:EditNoteArgs;
  constructor(private api:RedFruitApi,private noteService:NoteService,private dialog:MdDialog,private ngProgressService:NgProgressService) {
    //初始化日志查询参数
    this.selectCondition = new SelectCatalogNote();
    this.selectCondition.showHalfNote=true;
    this.selectCondition.byHalf=true;
    let pageRequest = new PageRequest();
    pageRequest.sortBy="date";
    this.selectCondition.pageRequestDto=pageRequest;

    this.pagedNote = new ShowPagedNote();

    //初始化日志编辑器参数,
    this.editorNoteArgs = new EditNoteArgs();
    this.editorNoteArgs.isAdd=true;
  }

  ngOnInit() {
    this.selectCatalogNote();

  }

  /**
   * 切换写日志
   */
  toggleWriteNote(){
    this.showWriteNote=!this.showWriteNote;
  }

  /**
   * 查询日志目录
   */
  selectCatalogNote(){
    this.ngProgressService.start();
    this.noteService.selectCatalogNote(this.selectCondition).subscribe(res=>{
      this.ngProgressService.done();
      this.pagedNote =res;
    });
  }

  /**
   * 分页查询
   * @param e
   */
  changedPage(e){
    this.selectCondition.pageRequestDto.pageSize=e.pageSize;
    this.selectCondition.pageRequestDto.pageIndex=e.pageIndex;
    this.selectCatalogNote();
    $(".mat-sidenav-content").scrollTop(120);
  }

}
