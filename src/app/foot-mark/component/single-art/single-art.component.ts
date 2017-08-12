import {Component, Input, OnInit} from '@angular/core';
import {ShowNoticeDto} from "../../model/show-notice-dto.model";

@Component({
  selector: 'app-single-art',
  templateUrl: './single-art.component.html',
  styleUrls: ['./single-art.component.css']
})
export class SingleArtComponent implements OnInit {

  @Input()
  noticeArt:ShowNoticeDto;
  constructor() { }

  ngOnInit() {
  }

}
