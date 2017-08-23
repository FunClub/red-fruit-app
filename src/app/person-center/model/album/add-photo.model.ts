import {ShowUploadPhoto} from "./show-upload-photo.model";
import {ShowAlbum} from "./show-album.model";
/**
 * 添加相片模型
 */
export class AddPhoto {
  photos:Photo[];
  albumId:string;
  quality:number;
}
/**
 * 相片
 */
export class Photo{
  path: string;
  name: string;
  albumId:string;
  waterMark:string;
  effect:string;
  bright:number;
  contrast:number;
  sharpen:number;
  blurR:number;
  blurS:number;
  quality:number;
}

/**
 * 显示添加相片的dialog参数模型
 */
export class ShowAddPhotoDialogArgs{
  albums:ShowAlbum[];
  /**
   * 将要上传照片的相册Id
   */
  currentAlbumId:string;

  /**
   * 被添加到后台的相片信息
   */
  addedPhotos:Photo[];
}
