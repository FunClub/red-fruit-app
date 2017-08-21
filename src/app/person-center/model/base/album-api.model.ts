/**
 * 相册模块api
 */
export class AlbumApi {
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
