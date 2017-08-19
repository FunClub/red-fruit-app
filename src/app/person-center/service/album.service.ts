import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BaseService} from "../../share/service/base.service";
import {Observable} from "rxjs/Observable";
import {AlbumApi} from "../model/base/album-api.model";
import {ResultView} from "../../share/model/base/result-view";
import {ShowAllAlbum} from "../model/album/show-album.model";
import {BucketFolder} from "../../share/model/bucket-folder.model";
import {ShowUploadPhoto} from "../model/album/show-upload-photo.model";
/**
 * 相册服务
 */
@Injectable()
export class AlbumService extends BaseService{


  constructor(private http:Http,private api:AlbumApi, private bucketFolder:BucketFolder) {
    super();
  }

  generateBase64Url(code:string){
    let formData = new FormData();
    formData.append("code",code);
    return this.http.post(this.api.BASE64_URL,formData).map(res=>res.json().data).catch(this.handleError);
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
    return this.http.post(this.api.PHOTO(this.bucketFolder.ALBUM),formData).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 查询相册
   * @returns {Observable<R|T>}
   */
  selectAllAlbum():Observable<ShowAllAlbum>{
    return this.http.get(this.api.ALBUM).map(res=>res.json().data).catch(this.handleError);
  }
  /**
   * 创建相册
   * @param album 待添加的相册
   * @returns {Observable<R|T>} 新增的相册
   */
  createAlbum(album:any):Observable<ResultView>{
    return this.http.post(this.api.ALBUM,album).map(res=>res.json()).catch(this.handleError);
  }
}
