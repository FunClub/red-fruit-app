import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {ArtArgs} from "../../model/base/art-args.model";
import {DiscussionService} from "../../service/discussion.service";
import {SelectDiscussionCondition} from "../../model/discussion/select-discussion-condition";
declare let $:any;
@Component({
  selector: 'app-more-discussion',
  templateUrl: './more-discussion.component.html',
  styleUrls: ['./more-discussion.component.css']
})
export class MoreDiscussionComponent implements OnInit {
  public args:ArtArgs;
  constructor(@Inject(MD_DIALOG_DATA) private artArgs: ArtArgs) {
    /*不与其他组件共用动态参数*/
    this.args = new ArtArgs();
    this.args.showPaginator=true;
    this.args.artId=artArgs.artId;
    this.args.discussionCount=artArgs.discussionCount;
    let condition = new SelectDiscussionCondition();
    condition.pageSize=artArgs.selectDiscussionCondition.pageSize;
    condition.pageIndex=1;
    condition.sortBy=artArgs.selectDiscussionCondition.sortBy;
    condition.artId = artArgs.artId;
    this.args.selectDiscussionCondition= condition;
  }

  ngOnInit() {

  }

  scrollToTop(){
    $(".mat-dialog-container").scrollTop(0);
  }
}
