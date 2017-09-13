/**
 * 圈子api
 */
export class CircleApi {
  /**
   * 查询一个帖子
   * @param postId
   * @return {string}
   * @constructor
   */
  POST(postId:string){
    return `circle/${postId}/post`;
  }
  /**
   * 帖子
   * @type {string}
   */
  ADD_POST:string="circle/post";

  /**
   * 查询帖子
   * @type {string}
   */
  POSTS:string="circle/posts";
}
