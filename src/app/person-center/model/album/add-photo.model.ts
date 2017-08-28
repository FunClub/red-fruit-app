
import {ShowAlbum} from "./show-album.model";
import {ArtArgs} from "../../../share/model/base/art-args.model";
/**
 * 添加相片模型
 */
export class AddPhoto {
  photos:Photo[];
  albumId:string;
  quality:number;
}
/**
 * 相片文档
 */
export class Photo{
  path: string;
  userId:string;
  photoId:string;
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
  description:string;
  zoomSize:number;
  hasWaterMark:boolean;
  fontSize:number;
  constructor() {
    this.bright=0;
    this.contrast=0;
    this.sharpen=50;
    this.blurS=0;
    this.blurR=0;
  }
}
export  class ShowPhoto extends Photo{
  discussionCount:number;
  thumbsUpCount:number;
  thumbsUpAble:boolean;
  nickname:string;
  profile:string;
  uploadDate:string;
  artArgs:ArtArgs;
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
  addedPhotos:ShowPhoto[];
}
