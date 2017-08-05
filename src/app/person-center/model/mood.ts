/**
 * 用于显示的单个心情模型
 */
export class Mood {
  moodId:string;
  userId:string;
  content:string;
  date:string;
  imgs:string[];
  thumbsUpUserIds:string[];
}
