import {Component, Input, OnInit} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

import {ArtType} from "../../model/art-opreation/art-type.model";
import {MoodService} from "../../../person-center/service/mood.service";

import {ArtArgs} from "../../model/base/art-args.model";

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

  /**
   * 动态参数
   */
  @Input()
  artArgs:ArtArgs;
  constructor(private artType:ArtType,private moodService:MoodService) {

  }
  ngOnInit() {

  }

  /**
   * 更新评论数
   */
  updateDiscussionCount(count:number){
      this.artArgs.discussionCount+=(count);
  }


  /**
   * 评论切换
   */
  toggleDiscussion(){
    this.artArgs.isDiscussOpen=!this.artArgs.isDiscussOpen;
  }

  /**
   * 点赞
   */
  updateThumbsUpCount(){
    //已经点赞就退出方法
    if(!this.artArgs.thumbsUpAble)return;
    //如果是心情点赞
    if(this.artArgs.artType==this.artType.MOOD){
      this.moodService.updateThumbsUpUserIds(this.artArgs.artId).subscribe(res=>{
        if(res){
          this.artArgs.thumbsUpAble=false;
           this.artArgs.thumbsUpCount++;
        }
      });
    }
  }
}
