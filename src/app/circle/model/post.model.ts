import {PageRequest} from "../../share/model/base/page-request.model";
import {ArtInfo} from "../../share/model/base/art-dto.model";
/**
 * 帖子模型
 */
export class Post {
  postId:string;
  circleName:string;
  title:string;
  content:string;
  anonymous:boolean;
  imgs:string[];
  constructor() {
    this.imgs = [];
  }
}

/**
 * 查询帖子模型
 */
export class SelectPostCondition extends PageRequest{
  circleName:string;
}
/**
 * 展示一个帖子的模型
 */
export class ShowPost{
  post:Post;
  artInfo:ArtInfo;
}

