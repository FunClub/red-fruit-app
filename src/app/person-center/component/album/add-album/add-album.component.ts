import { Component, OnInit } from '@angular/core';
import {albumType,limit} from "../../../../share/model/base/static-data.model"
@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  albumTypes:any[];
  albumLimits:any[];
  constructor() {
    this.albumTypes=albumType;
    this.albumLimits=limit;
  }

  ngOnInit() {
  }

}
