import {Photo} from "./add-photo.model";
/**
 * 水印参数
 */
export class WaterMarkArgs {
  /**
   * 是否是批量处理照片
   */
  isBatch:boolean;

  /**
   * 照片模型,是批处理时有值
   */
  photo:Photo;

  /**
   * 照片模型数组,不是批处理时有值
   */
  photos:Photo[];

  /**
   * 当前照片Index
   */
  currentIndex:number;
}
