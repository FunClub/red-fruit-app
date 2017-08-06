import {Mood} from "./mood";
/**
 * 包含单个心情和头像姓名的dto
 */
export class ShowMoodDto {
  moodId:string;
  nickname:string;
  profileImg:string;
  howLongAgo:string;
  mood:Mood;
  showSortDate:boolean;
  sortDate:string;
  shortDate:string;
  thumbsUpCount:number;
  thumbsUpAble:boolean;
  discussionCount:number;
}
