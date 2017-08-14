import { Component, OnInit } from '@angular/core';
import {NoticeArtService} from "../../service/notice-art.service";
import {ShowPagedNotice} from "../../model/show-paged-notice.model";
import {SelectNoticeCondition} from "../../model/select-notice-condition.model";
import {ShowNoticeDto} from "../../model/show-notice-dto.model";
import {NgProgressService} from "ngx-progressbar";
declare let $:any;
@Component({
  selector: 'app-my-art',
  templateUrl: './my-art.component.html',
  styleUrls: ['./my-art.component.css']
})
export class MyArtComponent implements OnInit {
  /**
   * 仅显示情侣动态
   */
  onlyShowHalf:boolean;
  /**
   * 分好页的通知动态
   */
  pageNotice:ShowPagedNotice;

  /**
   * 通知动态列表
   */
  showNoticeDtos:ShowNoticeDto[];

  /**
   * 查询通知动态条件
   */
  selectionCondition:SelectNoticeCondition;

  /**
   * 每页分页数量
   * @type {[number,number,number,number]}
   */
  pageSizeOptions = [5, 10, 25, 100];


  constructor(private noticeService:NoticeArtService,private ngProgressService:NgProgressService) {
    this.onlyShowHalf=true;
    this.selectionCondition = new SelectNoticeCondition();
  }
  changePage(event){
    this.selectionCondition.pageSize=event.pageSize;
    this.selectionCondition.pageIndex =event.pageIndex;
    this.selectNoticeArt();
  }
  ngOnInit() {

   this.selectNoticeArt();
  }
  selectNoticeArt(){
    this.ngProgressService.start();
   this.noticeService.selectNoticeArt(this.selectionCondition).subscribe(res=>{
      this.ngProgressService.done();
      this.pageNotice = res;
      this.showNoticeDtos = this.pageNotice.content;
      $(".mat-sidenav-content").scrollTop(60);
    });
  }
  deleteNotice(index:number){
    this.showNoticeDtos.splice(index,1);
    this.pageNotice.totalElements--;
  }
}
