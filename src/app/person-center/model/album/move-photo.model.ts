import {ShowAlbum} from "./show-album.model";
export class MovePhoto {
}

/**
 * 移动相片到其他相册的参数模型
 */
export class MovePhotoArgs{
  photoId:string;
  albums:ShowAlbum[]
}
