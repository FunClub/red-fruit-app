import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {Photo} from "../../../../model/album/add-photo.model";
import {UpdatePhotoInfo} from "../../../../model/album/update-photo.model";
import {ToastsManager} from "ng2-toastr";
import {AlbumService} from "../../../../service/album.service";

@Component({
  selector: 'app-edit-photo-info',
  templateUrl: './edit-photo-info.component.html',
  styleUrls: ['./edit-photo-info.component.css']
})
export class EditPhotoInfoComponent implements OnInit {
  /**
   * 修改相册模型
   */
  editInfo:UpdatePhotoInfo;
  busySubscribe:any;
  constructor(@Inject(MD_DIALOG_DATA) public photo:Photo,private toastsManager:ToastsManager,private albumService:AlbumService) {
    this.editInfo = new UpdatePhotoInfo();
    this.editInfo.name = photo.name;
    this.editInfo.description = photo.description;
    this.editInfo.photoId = photo.photoId;
  }

  ngOnInit() {

  }

  savePhotoInfo(close:HTMLButtonElement){
    this.busySubscribe=this.albumService.savePhotoInfo(this.editInfo).subscribe(res=>{
      if(res){
        this.toastsManager.success("信息修改成功","修改结果");
        this.photo.name=this.editInfo.name;
        this.photo.description =this.editInfo.description;
        close.click();
      }else{
        this.toastsManager.error("信息修改失败,请重试...","修改结果");
      }
    });
  }
}
