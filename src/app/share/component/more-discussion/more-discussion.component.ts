import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {ArtArgs} from "../../model/base/art-args.model";
import {DiscussionService} from "../../service/discussion.service";
@Component({
  selector: 'app-more-discussion',
  templateUrl: './more-discussion.component.html',
  styleUrls: ['./more-discussion.component.css']
})
export class MoreDiscussionComponent implements OnInit {
  pageSizeOptions = [5, 10, 25, 100];

  constructor(@Inject(MD_DIALOG_DATA) public artArgs: ArtArgs) {

  }

  ngOnInit() {
  }

  changedPage(e) {
    this.artArgs.selectDiscussionCondition.pageIndex=e.pageIndex;

  }
}
