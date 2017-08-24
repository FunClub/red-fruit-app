import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-show-one-photo',
  templateUrl: './show-one-photo.component.html',
  styleUrls: ['./show-one-photo.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(10px)'}),
          style({opacity: 0.5, transform: 'translateY(0)'}),
          style({opacity: 1, transform: 'translateY(0)'})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(5px)'}),
          style({opacity: 0, transform: 'translateY(10px)'})
        ]))
      ])
    ]),
    trigger('flyXInOutFromRight', [
      transition('void => *', [
        animate("500ms",keyframes([
          style({opacity: 0, transform: 'translateX(5%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateX(5px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
    ]),
  ]
})
export class ShowOnePhotoComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170820000636-797568141234.JPG";
  /**
   * 是否显示相片列表
   */
  showPhotoList:boolean;
  constructor() { }

  ngOnInit() {
  }

  /**
   * 切换相片列表
   */
  togglePhotoList(){
    this.showPhotoList=!this.showPhotoList;
  }
}
