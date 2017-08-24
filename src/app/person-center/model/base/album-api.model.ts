/**
 * 相册模块api
 */
export class AlbumApi {
  /**
   * 移动相片到其他相册
   * @type {string}
   */
  MOVE_ALBUM_PHOTO:string="album/photo/albumId";
  /**
   * 相册封面样式
   * @type {string}
   */
  ALBUM_COVER_STYLE:string ="?x-oss-process=style/album-cover";
  /**
   * 相册封面
   * @type {string}
   */
  ALBUM_COVER:string = "album/cover";
  /**
   * 相片信息
   * @type {string}
   */
  PHOTO_INFO:string="album/photo-info";
  /**
   * 小的相片样式
   * @type {string}
   */
  SMALL_PHOTO_STYLE:string = "?x-oss-process=style/small-show-photo";

  /**
   * 小的封面照样式
   * @type {string}
   */
  SMALL_ALBUM_COVER_STYLE:string="?x-oss-process=style/small-album-cover";
  /**
   * 查询一个相册及其相片信息
   * @param albumId
   * @returns {string}
   * @constructor
   */
  PHOTOS(albumId:string){
    return  `album/${albumId}/photos`
  }
  /**
   * 生成base64URL
   * @type {string}
   */
  BASE64_URL:string="share/base64-url";
  /**
   * 显示上传相册的样式
   * @type {string}
   */
  SHOW_PHOTO_STYLE:string="?x-oss-process=style/add-photo";
  /**
   * 相册操作
   * @type {string}
   */
  ALBUM:string="album/";

  /**
   * 相片操作
   * @type {string}
   */
  PHOTO(folder:string){
    return `${this.ALBUM}${folder}/photo`
  }
  ADD_PHOTO:string = "album/photo"
}
