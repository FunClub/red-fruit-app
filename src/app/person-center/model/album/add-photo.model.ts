import {ShowUploadPhoto} from "./show-upload-photo.model";
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
