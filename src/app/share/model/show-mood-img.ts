/**
 * 显示心情图片的模型
 */
export class ShowMoodImg {
  /**
   * 普通光标
   * @type {number}
   */
  SIMPLE_CURSOR:number=0;

  /**
   * 上一张图片的光标
   * @type {number}
   */
  PREV_CURSOR:number=1;

  /**
   * 缩小图片的光标
   * @type {number}
   */
  ZOOM_OUT_CURSOR:number=2;

  /**
   * 下一张图片的光标
   * @type {number}
   */
  NEXT_CURSOR:number=3;

  /**
   * 心情小图参数
   * @type {string}
   */
  SMALL_IMG:string="?x-oss-process=image/resize,m_fill,h_100,w_100";

  /**
   * 详细心情小图参数
   * @type {string}
   */
  SMALL_DETAIL_IMG="?x-oss-process=image/resize,m_fill,h_60,w_60";

  /**
   * 详细大图参数
   * @type {string}
   */
  DETAIL_IMG="?x-oss-process=image/resize,m_fill,w_500,h_600";
}
