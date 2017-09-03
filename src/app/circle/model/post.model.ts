/**
 * 帖子
 */
export class Post {
  circleId:string;
  title:string;
  content:string;
  isAnonymous:boolean;
  imgs:string[];

  constructor() {
    this.imgs = [];
  }
}
