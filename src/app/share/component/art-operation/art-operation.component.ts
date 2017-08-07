import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {RfEditorOptions} from "../../model/rf-editor-options.model";
import {ArtType} from "../../model/art-opreation/art-type.model";
import {MoodService} from "../../../person-center/service/mood.service";

@Component({
  selector: 'app-art-operation',
  templateUrl: './art-operation.component.html',
  styleUrls: ['./art-operation.component.css'],
  animations:[
    trigger('flyInFromTop', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-5%)'}),
          style({opacity: 0.5, transform: 'translateY(5px)'}),
          style({opacity: 1, transform: 'translateY(0)'})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(-5px)'}),
          style({opacity: 0, transform: 'translateY(5%)'})
        ]))
      ])
    ]),
    trigger('flyXInOutFromLeft', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-5%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(5px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(5px)'}),
          style({opacity: 0, transform: 'translateY(-5%)'})
        ]))
      ])
    ])
  ]
})
export class ArtOperationComponent implements OnInit {
  @Input()
  artId:string;
  @Input()
  thumbsUpCount:number;
  @Input()
  thumbsUpAble:boolean;
  isDiscussOpen=false;
  @Input()
  discussionCount:number;
  @Input("artType")
  actualArtType:string;

  constructor(private artType:ArtType,private moodService:MoodService) {
  }

  /**
   * 添加评论数
   */
  addDiscussionCount(){
      this.discussionCount++;
  }
  ngOnInit() {
  }
  toggleDiscussion(){
    this.isDiscussOpen=!this.isDiscussOpen;
  }

  /**
   * 点赞
   */
  updateThumbsUpCount(){
    //已经点赞就退出方法
    if(!this.thumbsUpAble)return;
    //如果是心情点赞
    if(this.actualArtType==this.artType.MOOD){

      this.moodService.updateThumbsUpUserIds(this.artId).subscribe(res=>{
        if(res){
          this.thumbsUpAble=false;
           this.thumbsUpCount++;
        }
      });
    }
  }
}
