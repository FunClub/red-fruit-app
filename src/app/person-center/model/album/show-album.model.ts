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
