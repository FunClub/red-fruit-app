import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-photos',
  templateUrl: './show-photos.component.html',
  styleUrls: ['./show-photos.component.css']
})
export class ShowPhotosComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/album/20170820000450-79863278123.JPG?x-oss-process=style/small-album-cover";
  constructor() { }

  ngOnInit() {
  }

}
