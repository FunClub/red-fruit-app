import {ShowNoticeDto} from "./show-notice-dto.model";
/**
 * 分页的动态通知
 */
export class ShowPagedNotice {
  totalElements:number;
  content:ShowNoticeDto[];
}
