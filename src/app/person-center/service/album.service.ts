import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {Observable} from "rxjs/Observable";
import {AlbumApi} from "../model/base/album-api.model";
import {ResultView} from "../../share/model/base/result-view";
import {ShowAlbumPhoto, ShowAllAlbum} from "../model/album/show-album.model";
import {BucketFolder} from "../../share/model/bucket-folder.model";

import {AddPhoto, Photo, ShowPhoto} from "../model/album/add-photo.model";
import {UpdateAlbumCover, UpdatePhotoInfo} from "../model/album/update-photo.model";
import {MovePhoto} from "../model/album/move-photo.model";
import {NoticeArt} from "../../foot-mark/model/notice-art.model";
import {ArtArgs} from "../../share/model/base/art-args.model";
import {ArtType} from "../../foot-mark/model/art-type.model";
import {SelectDiscussionCondition} from "../../share/model/discussion/select-discussion-condition";
/**
 * 相册服务
 */
@Injectable()
export class AlbumService extends BaseService{


  constructor(private http:Http,private albumApi:AlbumApi, private bucketFolder:BucketFolder,private artType:ArtType) {
    super();
  }
  thumbsUp(noticeArt:NoticeArt){
    return this.http.put(this.albumApi.THUMBS_UP,noticeArt).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 移动相片到其他相册
   * @param movePhoto  移动相片到其他相册的模型
   * @returns {Observable<R|T>}
   */
  moveAlbumPhoto(movePhoto:MovePhoto):Observable<boolean>{
    return this.http.put(this.albumApi.MOVE_ALBUM_PHOTO,movePhoto).map(res=>res.json().data).catch(this.handleError);
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
    return this.http.get(this.albumApi.PHOTOS(albumId)).map(res=>{
      let data=res.json().data as ShowAlbumPhoto;
      let photos = data.photos;
      for(let photo of photos){
       this.initPhotoArtArgs(photo);
      }
    return data;
    }).catch(this.handleError);
  }

  /**
   * 初始化相册数据
   * @param photo
   */
  initPhotoArtArgs(photo:ShowPhoto){
    let artArgs = new ArtArgs();
    artArgs.artUserId=photo.userId;
    artArgs.artType=this.artType.PHOTO;
    artArgs.original=true;
    artArgs.isDiscussOpen=true;
    artArgs.firstArtImg=photo.path;
    artArgs.artContent=photo.name;
    artArgs.selectDiscussionCondition = new SelectDiscussionCondition();
    artArgs.selectDiscussionCondition.artId=photo.photoId;
    artArgs.artId=photo.photoId;
    artArgs.thumbsUpCount = photo.thumbsUpCount;
    artArgs.thumbsUpAble = photo.thumbsUpAble;
    artArgs.discussionCount = photo.discussionCount;
    artArgs.faceAble=false;
    photo.artArgs=artArgs;
    let hasWaterMark=false;
    if(!photo.waterMark){
      photo.waterMark="";
      hasWaterMark=false;
    }else{
      photo.waterMark='?x-oss-process=image'+photo.waterMark;
      hasWaterMark=true;
    }
    if(!photo.sharpen){
      photo.sharpen=50;
    }
    if(!photo.contrast){
      photo.contrast=0;
    }
    if(!photo.bright){
      photo.bright=0;
    }
    let effect="";
    if(!hasWaterMark){
      effect="?x-oss-process=image";
    }
    effect +=  `/bright,${photo.bright}/sharpen,${photo.sharpen}/contrast,${photo.contrast}`;
    if(photo.blurR){
      effect+= `/blurR,${photo.blurR}/blurS,${photo.blurS}`
    }
    photo.effect=effect;
  }
  /**
   * 添加相片
   * @param addPhoto 添加相片模型
   * @param uploadPhotos 上传的相片模型数组
   * @returns {Observable<R|T>}
   */
  save(addPhoto:AddPhoto,uploadPhotos:Photo[]){
    for(let upload of uploadPhotos){
      upload.quality = addPhoto.quality;
      upload.albumId=addPhoto.albumId;
    }
    addPhoto.photos=uploadPhotos;
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
  uploadPhoto(files:any[]):Observable<Photo[]>{
    let formData = new FormData();
    for(let file of files){
      formData.append("imgs",file);
    }
    return this.http.post(this.albumApi.PHOTO(this.bucketFolder.ALBUM),formData).map(res=>{
     let photos= res.json().data as Photo[];
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
