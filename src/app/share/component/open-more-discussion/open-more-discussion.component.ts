import {Component, Input, OnInit} from '@angular/core';
import {ArtArgs} from "../../model/base/art-args.model";
import {MdDialog, MdDialogRef} from "@angular/material";
import {MoreDiscussionComponent} from "../more-discussion/more-discussion.component";
declare let $:any;
@Component({
  selector: 'app-open-more-discussion',
  templateUrl: './open-more-discussion.component.html',
  styleUrls: ['./open-more-discussion.component.css']
})
export class OpenMoreDiscussionComponent implements OnInit {

  @Input()
  artArgs:ArtArgs;
  constructor(private dialog:MdDialog) {

  }

  ngOnInit() {

  }

  /**
   * 关闭评论
   */
  closeDiscussion(){
    this.artArgs.isDiscussOpen=false;
  }

  /**
   * 显示更多评论
   */
  showMoreDiscussion(){
    this.dialog.open(MoreDiscussionComponent,{
      data:this.artArgs,
      panelClass:'more-discussion-panel'
    }).afterClosed().subscribe(()=>{
      $('.sub-discussion-editor').froalaEditor("html.set","");
    });
  }
}
