import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
      transition('void => *', [
        animate("1000ms",keyframes([
          style({opacity: 0, transform: 'scale(1,1)', offset: 0}),
          style({opacity: 0.5, transform: 'scale(1,1)',  offset: 0.3}),
          style({opacity: 1, transform: 'scale(1,1)',     offset: 1.0})
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
export class SingleAlbumComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/mood/20170812220857-691615814QQ%E5%9B%BE%E7%89%8720170805114350.jpg?x-oss-process=style/album-cover";
  constructor() { }

  ngOnInit() {
  }

}
