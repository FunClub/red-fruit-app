import {ShowAlbum} from "./show-album.model";
import {Photo, ShowPhoto} from "./add-photo.model";

/**
 * 移动相片到其他相册的参数模型
 */
export class MovePhotoArgs{
  /**
   * 要移动的相片id
   */
  photoIds:string[];
  /**
   * 要移动的相片索引,用于删除相片
   */
  photoIdIndex:number[];

  /**
   * 移动到某个相册的id
   */
  movedAlbumId:string;
  albums:ShowAlbum[];
  photos:ShowPhoto[];

}
/**
 * 移动相片到其他相册的模型
 */
export class MovePhoto{
  photoIds:string[];
  /**
   * 被移动的相片的相册id
   */
  movedAlbumId:string;
  /**
   * 目标相册id
   */
  tarGetAlbumId:string;
}
