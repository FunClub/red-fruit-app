import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ShowAlbum} from "../../../model/album/show-album.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {Router} from "@angular/router";
import {AlbumApi} from "../../../model/base/album-api.model";
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
  /**
   * 单一相册数据
   */
  @Input()
  album:ShowAlbum;

  constructor(public api:RedFruitApi,private router:Router,public albumApi:AlbumApi) {

  }

  ngOnInit() {
  }
  toPhotos(){
    this.router.navigate(["home/person-center/album/photos",this.album.albumId])

  }
}
