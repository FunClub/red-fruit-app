import {ShowParentDiscussion} from "../../share/model/discussion/show-parent-discussion.model";
/**
 * 显示单一的通知动态
 */
export class ShowNoticeDto {
  generateUserId:string;
  generateNickname:string;
  generateProfileImg:string;
  noticeArtType:string;
  original:boolean;
  originalArtId:string;
  originalUserId:string;
  artType:string;
  artId:string;
  artUserId:string;
  sortDate:string;
  shortDate:string;
  artNickname:string;
  firstArtImg:string;
  artContent:string;
  currentContent:string;
  discussion:ShowParentDiscussion;
}
