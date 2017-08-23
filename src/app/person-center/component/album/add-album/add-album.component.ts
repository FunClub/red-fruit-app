import {Component, Inject, OnInit} from '@angular/core';
import {albumType,limit} from "../../../../share/model/base/static-data.model"
import {AlbumService} from "../../../service/album.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {MD_DIALOG_DATA} from "@angular/material";
import {ShowAlbum} from "../../../model/album/show-album.model";
@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  albumTypes:any[];
  albumLimits:any[];
  constructor(private albumService:AlbumService,private toastsManager:ToastsManager,
              private toastOptions:ToastOptions,@Inject(MD_DIALOG_DATA) private albums:ShowAlbum[]) {
    this.albumTypes=albumType;
    this.albumLimits=limit;
  }

  ngOnInit() {
  }
  closeAddAlbumDialog(close:HTMLButtonElement){
    close.click();
  }
  createAlbum(album:any,close:HTMLButtonElement){
    this.albumService.createAlbum(album).subscribe(res=>{
      if(res.code==200){
        this.closeAddAlbumDialog(close);
        this.albums.unshift(res.data);
        this.toastsManager.success("创建相册成功","创建结果",this.toastOptions);
      }else {
        this.toastsManager.error("创建相册失败,请重试...","创建结果",this.toastOptions);
      }
    });
  }
}
