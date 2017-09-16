import {Component, Input, OnInit} from '@angular/core';
import {Post, ShowPost} from "../../model/post.model";
import {ArtInfo} from "../../../share/model/base/art-dto.model";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-circle-art-catalog',
  templateUrl: './circle-art-catalog.component.html',
  styleUrls: ['./circle-art-catalog.component.css'],
  animations: [
    trigger('flyXInOutFromTop', [
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
export class CircleArtCatalogComponent implements OnInit {
  @Input()
  showPost:ShowPost;
  /**
   * 动态信息
   */
  artInfo:ArtInfo;

  /**
   * 帖子
   */
  post:Post;

  showBusinessCard:boolean;

  constructor(public api:RedFruitApi) {
    this.showBusinessCard = false;
  }

  ngOnInit() {
    $(".circle-text-content img,.circle-text-content .fr-emoticon-img").remove();
    this.post=this.showPost.post;
    this.artInfo=this.showPost.artInfo;
  }

}
