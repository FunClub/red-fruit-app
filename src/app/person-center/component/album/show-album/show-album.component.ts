import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";

import {AlbumService} from "../../../service/album.service";
import {ShowAlbum, ShowAllAlbum} from "../../../model/album/show-album.model";
import {AddAlbumComponent} from "../add-album/add-album.component";
import {AddPhotoComponent} from "../add-photo/add-photo.component";
import {ShowAddPhotoDialogArgs} from "../../../model/album/add-photo.model";

@Component({
  selector: 'app-show-album',
  templateUrl: './show-album.component.html',
  styleUrls: ['./show-album.component.css']
})
export class ShowAlbumComponent implements OnInit {
  /**
   * 显示所有相册的数据模型
   */
  showAllAlbum:ShowAllAlbum;

  /**
   * 相册数据
   */
  albums:ShowAlbum[];
  addPhotoArgs:ShowAddPhotoDialogArgs;

  constructor(private dialog:MdDialog,private albumService:AlbumService,) {
    this.albums=[];
    this.addPhotoArgs = new ShowAddPhotoDialogArgs();
  }

  ngOnInit() {
    this.albumService.selectAllAlbum().subscribe(res=>{
      if(res){//如果相册数据不为空
        this.showAllAlbum = res;
        this.albums = this.showAllAlbum.albums;
        this.addPhotoArgs.albums=this.albums;
      }

    })
  }

  openAddAlumDialog(){
    this.dialog.open(AddAlbumComponent,{
      data:this.albums,
    });
  }
  openAddPhotoDialog(){
    this.addPhotoArgs.currentAlbumId=this.albums[0].albumId;
    this.dialog.open(AddPhotoComponent,{
      panelClass:'add-photo-panel',
      disableClose:true,
      data:this.addPhotoArgs
    });
  }

}
