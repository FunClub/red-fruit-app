import {PageRequest} from "../base/page-request.model";
/**
 * 查询日志目录的模型
 */
export class SelectCatalogNote {
  pageRequestDto:PageRequest;

  /**
   * 是否显示情侣日志
   */
  showHalfNote:boolean;
  /**
   * 是否是情侣间查询
   */
  byHalf:boolean;
}
