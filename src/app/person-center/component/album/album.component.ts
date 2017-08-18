import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {AddAlbumComponent} from "./add-album/add-album.component";
import {AlbumService} from "../../service/album.service";
import {ShowAlbum, ShowAllAlbum} from "../../model/album/show-album.model";
import {AddPhotoComponent} from "./add-photo/add-photo.component";




@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  /**
   * 显示所有相册的数据模型
   */
  showAllAlbum:ShowAllAlbum;
  albums:ShowAlbum[];
  constructor(private dialog:MdDialog,private albumService:AlbumService) {
    this.albums=[];
  }

  ngOnInit() {
    this.albumService.selectAllAlbum().subscribe(res=>{
      this.showAllAlbum = res;
      this.albums = this.showAllAlbum.albums;
    })
  }

  openAddAlumDialog(){
    this.dialog.open(AddAlbumComponent,{
      data:this.albums,

    });
  }
  openAddPhotoDialog(){
    this.dialog.open(AddPhotoComponent,{
      panelClass:'add-photo-panel',
      data:this.albums
    });
  }


}
