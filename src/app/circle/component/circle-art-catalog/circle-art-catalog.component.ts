import {Component, Input, OnInit} from '@angular/core';
import {Post, ShowPost} from "../../model/post.model";
import {ArtInfo} from "../../../share/model/base/art-dto.model";
import {RedFruitApi} from "../../../share/model/base/api.model";

@Component({
  selector: 'app-circle-art-catalog',
  templateUrl: './circle-art-catalog.component.html',
  styleUrls: ['./circle-art-catalog.component.css']
})
export class CircleArtCatalogComponent implements OnInit {
  @Input()
  showPost:ShowPost;
  artInfo:ArtInfo;
  post:Post;
  constructor(public api:RedFruitApi) {

  }

  ngOnInit() {
    $(".circle-text-content img,.circle-text-content .fr-emoticon-img").remove();
    this.post=this.showPost.post;
    this.artInfo=this.showPost.artInfo;
  }

}
