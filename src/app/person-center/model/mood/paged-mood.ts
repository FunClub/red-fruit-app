import {ShowMoodDto} from "./show-mood-dto.model";
/**
 * 分页的心情模型
 */
export class PagedMood {
  /**
   * 总心情数量
   */
  totalElements:number;

  /**
   * 心情数组
   */
  content:ShowMoodDto[];
}
