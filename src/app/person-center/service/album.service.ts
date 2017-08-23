import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {Observable} from "rxjs/Observable";
import {AlbumApi} from "../model/base/album-api.model";
import {ResultView} from "../../share/model/base/result-view";
import {ShowAllAlbum} from "../model/album/show-album.model";
import {BucketFolder} from "../../share/model/bucket-folder.model";
import {ShowUploadPhoto} from "../model/album/show-upload-photo.model";
import {AddPhoto, Photo} from "../model/album/add-photo.model";
import {UpdateAlbumCover, UpdatePhotoInfo} from "../model/album/update-photo.model";
/**
 * 相册服务
 */
@Injectable()
export class AlbumService extends BaseService{


  constructor(private http:Http,private albumApi:AlbumApi, private bucketFolder:BucketFolder) {
    super();
  }

  /**
   * 更新相册封面
   * @param updateCover 封面更新模型
   * @returns {Observable<R|T>}
   */
  updateAlbumCover(updateCover:UpdateAlbumCover):Observable<boolean>{
    return this.http.put(this.albumApi.ALBUM_COVER,updateCover).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 保存相片信息
   * @param photoInfo
   */
  savePhotoInfo(photoInfo:UpdatePhotoInfo):Observable<boolean>{
    return this.http.put(this.albumApi.PHOTO_INFO,photoInfo).map(res=>res.json().data).catch(this.handleError);
  }

  /**
   * 查询相册及其相片
   * @param albumId 相册id
   * @returns {Observable<R|T>}
   */
  selectPhotos(albumId:string){
    return this.http.get(this.albumApi.PHOTOS(albumId)).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 添加相片
   * @param addPhoto 添加相片模型
   * @param uploadPhotos 上传的相片模型数组
   * @returns {Observable<R|T>}
   */
  save(addPhoto:AddPhoto,uploadPhotos:ShowUploadPhoto[]){
    let photos:Photo[] = [];
    let photo;
    for(let upload of uploadPhotos){
      photo = new Photo();
      photo.albumId = addPhoto.albumId;
      photo.path = upload.path;
      photo.waterMark = upload.waterMark;

      //如果效果是默认值就不保存
      if(upload.blurS!=0){
        photo.blurS = upload.blurS;
      }
      if(upload.blurR!=0){
        photo.blurR = upload.blurR;
      }
      if (upload.contrast!=0){
        photo.contrast= upload.contrast;
      }
      if(upload.sharpen !=50){
        photo.sharpen = upload.sharpen;
      }
      if(upload.bright !=0){
        photo.bright = upload.bright;
      }
      photo.name = upload.name;
      photo.effect = upload.effect;
      photo.quality = addPhoto.quality;
      photos.push(photo);
    }
   addPhoto.photos=photos;
    return this.http.post(this.albumApi.ADD_PHOTO,addPhoto).map(res=>res.json()).catch(this.handleError);
  }
  /**
   * 生成base64位url
   * @param code
   * @returns {Observable<R|T>}
   */
  generateBase64Url(code:string){
    let formData = new FormData();
    formData.append("code",code);
    return this.http.post(this.albumApi.BASE64_URL,formData).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 上传照片
   * @param files 文件数组
   * @returns {Observable<R|T>}
   */
  uploadPhoto(files:any[]):Observable<ShowUploadPhoto[]>{
    let formData = new FormData();
    for(let file of files){
      formData.append("imgs",file);
    }
    return this.http.post(this.albumApi.PHOTO(this.bucketFolder.ALBUM),formData).map(res=>{
     let photos= res.json().data as ShowUploadPhoto[];
     for(let p of photos){
       p.hasWaterMark=false;
       p.blurS=0;
       p.sharpen=50;
       p.contrast=0;
       p.bright=0;
       p.blurS=0;
       p.blurR=0;
     }
     return photos;
    }).catch(this.handleError);
  }
  /**
   * 查询相册
   * @returns {Observable<R|T>}
   */
  selectAllAlbum():Observable<ShowAllAlbum>{
    return this.http.get(this.albumApi.ALBUM).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 创建相册
   * @param album 待添加的相册
   * @returns {Observable<R|T>} 新增的相册
   */
  createAlbum(album:any):Observable<ResultView>{
    return this.http.post(this.albumApi.ALBUM,album).map(res=>res.json()).catch(this.handleError);
  }
}
