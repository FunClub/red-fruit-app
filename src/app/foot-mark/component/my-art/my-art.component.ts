import { Component, OnInit } from '@angular/core';
import {NoticeArtService} from "../../service/notice-art.service";
import {ShowPagedNotice} from "../../model/show-paged-notice.model";
import {SelectNoticeCondition} from "../../model/select-notice-condition.model";
import {ShowNoticeDto} from "../../model/show-notice-dto.model";

@Component({
  selector: 'app-my-art',
  templateUrl: './my-art.component.html',
  styleUrls: ['./my-art.component.css']
})
export class MyArtComponent implements OnInit {
  onlyShowHalf:boolean;
  pageNotice:ShowPagedNotice;
  showNoticeDtos:ShowNoticeDto[]
  selectionCondition:SelectNoticeCondition;
  pageSizeOptions = [5, 10, 25, 100];
  constructor(private noticeService:NoticeArtService) {
    this.onlyShowHalf=true;
    this.selectionCondition = new SelectNoticeCondition();
  }

  ngOnInit() {
    this.noticeService.selectNoticeArt(this.selectionCondition).subscribe(res=>{
      this.pageNotice = res;
      console.log(this.pageNotice);
      this.showNoticeDtos = this.pageNotice.content;
    });
  }

}
