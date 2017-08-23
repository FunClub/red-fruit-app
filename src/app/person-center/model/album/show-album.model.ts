import {Photo} from "./add-photo.model";
/**
 * 显示所有相册模型
 */
export class ShowAllAlbum{
  totalPhoto:number;
  totalThumbsUp:number;
  albums:ShowAlbum[];
}

/**
 * 显示单个相册模型
 */
export class ShowAlbum {
  albumId:string;
  coverImg:string;
  albumName:string;
  /**
   * 分类
   */
  sort:string;
  /**
   * 权限
   */
  limit:number;
  photoCount:string;

}
/**
 * 显示一个相册及其相片的模型
 */
export class ShowAlbumPhoto {
  /**
   * 当前正在查询的相册
   */
  currentAlbum:ShowAlbum;
  /**
   * 相册集合，用于显示上传相片时的相册信息
   */
  albums:ShowAlbum[];
  photos:Photo[];
}
