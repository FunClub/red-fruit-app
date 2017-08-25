import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../../service/album.service";
import {RedFruitApi} from "../../../../share/model/base/api.model";
import {AlbumApi} from "../../../model/base/album-api.model";
import {Photo, ShowAddPhotoDialogArgs} from "../../../model/album/add-photo.model";
import {ShowAlbum, ShowAlbumPhoto} from "../../../model/album/show-album.model";
import {MdDialog} from "@angular/material";
import {AddPhotoComponent} from "../add-photo/add-photo.component";
import {EditPhotoInfoComponent} from "./edit-photo-info/edit-photo-info.component";
import {UpdateAlbumCover} from "../../../model/album/update-photo.model";
import {ToastsManager} from "ng2-toastr";
import {NgProgressService} from "ngx-progressbar";
import {MovePhotoComponent} from "./move-photo/move-photo.component";
import {MovePhotoArgs} from "../../../model/album/move-photo.model";
import {ShowOnePhotoComponent} from "./show-one-photo/show-one-photo.component";
import {ShowPhotoArg} from "../../../model/album/show-photo-arg.model";

@Component({
  selector: 'app-show-photos',
  templateUrl: './show-photos.component.html',
  styleUrls: ['./show-photos.component.css']
})
export class ShowPhotosComponent implements OnInit {
  /**
   * 相册id
   */
  albumId: string;
  /**
   * 显示一个相册及其相片的模型
   */
  showAlbumPhoto: ShowAlbumPhoto;

  /**
   * 相片数组
   */
  photos: Photo[];

  /**
   * 当前相册信息
   */
  currentAlbum: ShowAlbum;

  /**
   * 相册信息数组
   */
  albums: ShowAlbum[];

  /**
   * 显示添加相片的dialog参数模型
   */
  addPhotoArgs: ShowAddPhotoDialogArgs;

  constructor(private activatedRoute: ActivatedRoute, private albumService: AlbumService, public api: RedFruitApi,
              public albumApi: AlbumApi, private dialog: MdDialog,private toastsManager:ToastsManager,private ngProgressService:NgProgressService) {
    this.albumId = activatedRoute.snapshot.params['albumId'];
    this.photos = [];
    this.currentAlbum = new ShowAlbum();
    this.addPhotoArgs = new ShowAddPhotoDialogArgs();

  }

  ngOnInit() {
    this.selectPhoto();
  }
  showDetailPhoto(index:number){
    let photoArgs = new ShowPhotoArg();
    photoArgs.photos=this.photos;
    photoArgs.album=this.currentAlbum;
    photoArgs.currentIndex = index;
    this.dialog.open(ShowOnePhotoComponent,{
      panelClass:'show-photo-panel',
      data:photoArgs
    })
  }
  /**
   * 移动相片到其他相册
   * @param photoId 照片Id
   * @param index 相片索引，用于在界面上移除相片
   */
  movePhoto(photoId:string,index:number){
    /*准备移动到相册的参数*/
      let movePhotoArgs = new MovePhotoArgs();
      movePhotoArgs.photoIds=[photoId];
      movePhotoArgs.photoIdIndex=[index];
      movePhotoArgs.movedAlbumId=this.albumId;
      movePhotoArgs.albums=[];
      movePhotoArgs.photos = this.photos;
      //复制相册数组
      for (let album of this.albums){
        if(album.albumId!=this.currentAlbum.albumId){
           let al = new ShowAlbum();
           for(let key in album){
             al[key]=album[key];
           }
          movePhotoArgs.albums.push(al);
        }
      }
      this.dialog.open(MovePhotoComponent,{
        data:movePhotoArgs
      });
  }

  /**
   * 修改封面
   * @param path
   */
  updateAlbumCover(path: string) {
    let updateCover = new UpdateAlbumCover();
    updateCover.albumId = this.albumId;
    updateCover.coverImg=path;
    this.albumService.updateAlbumCover(updateCover).subscribe(res=>{
      if(res){
        this.toastsManager.success("修改封面成功","修改结果");
        this.currentAlbum.coverImg=path;
      }else{
        this.toastsManager.error("修改封面失败,请重试...","修改结果");
      }
    });

  }

  /**
   * 编辑相片信息
   * @param photo
   */
  editPhotoInfo(photo: Photo) {
    this.dialog.open(EditPhotoInfoComponent, {
      data: photo
    })
  }

  /**
   * 查询本相册的信息和照片
   */
  selectPhoto() {
    this.ngProgressService.start();
    this.albumService.selectPhotos(this.albumId).subscribe(res => {
      this.ngProgressService.done();
      this.showAlbumPhoto = res;
      this.photos = this.showAlbumPhoto.photos;
      this.albums = this.showAlbumPhoto.albums;
      this.currentAlbum = this.showAlbumPhoto.currentAlbum;
      this.addPhotoArgs.albums = this.albums;
    });
  }

  /**
   * 打开添加相片dialog
   */
  addPhoto() {
    this.addPhotoArgs.currentAlbumId = this.albumId;
    this.dialog.open(AddPhotoComponent, {
      panelClass: 'add-photo-panel',
      disableClose: true,
      data: this.addPhotoArgs
    }).afterClosed().subscribe(res => {
      if (res) {//如果保存了相片就更新相片信息
        this.photos = this.addPhotoArgs.addedPhotos.concat(this.photos);
      }
    });
  }
}
