import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog} from "@angular/material";
import {ShowAlbum} from "../../../model/album/show-album.model";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {WaterMarkComponent} from "../water-mark/water-mark.component";
import {BucketFolder} from "../../../../share/model/bucket-folder.model";
import {ImageUploadService} from "../../../../share/service/image-upload.service";
import {AlbumService} from "../../../service/album.service";

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public albums:ShowAlbum[],public api:RedFruitApi,private dialog:MdDialog,
              private albumService:AlbumService
  ) { }
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/mood/20170802213619-1557573916123.JPG?x-oss-process=style/add-photo";
  ngOnInit() {
  }

  /**
   * 关闭添加相片dialog
   * @param close
   */
  closeAddPhotoDialog(close:HTMLButtonElement,){
    close.click();
  }

  /**
   * 上传相片
   * @param event 文件上传事件
   */
  uploadPhoto(event){
    let files = event.target.files;
    this.albumService.uploadPhoto(files).subscribe(res=>{

    })
  }

  /**
   * 打开水印dialog
   */
  openWaterMarkDialog(){
    this.dialog.open(WaterMarkComponent);
  }
}
