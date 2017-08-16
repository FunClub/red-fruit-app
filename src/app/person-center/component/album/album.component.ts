import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {AddAlbumComponent} from "./add-album/add-album.component";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/mood/20170812220857-691615814QQ%E5%9B%BE%E7%89%8720170805114350.jpg?x-oss-process=style/album-cover";
  constructor(private dialog:MdDialog) { }
  i=20;
  ngOnInit() {

  }

  openAddAlumDialog(){
    this.dialog.open(AddAlbumComponent,{
      panelClass:'base-dialog-panel'
    });
  }
}
