/**
 * 应用api
 */
export  class RedFruitApi {
  /**
   * 编辑器相片
   * @type {string}
   */
  EDITOR_PHOTO:string="album/editor-photo";
  /**
   * 通知socket
   * @param userId
   * @returns {string}
   * @constructor
   */
  NOTICE_SOCKET(userId:string){
    return `ws://localhost/notice/${userId}`
  }

  /**
   * 情侣邀请socket
   * @param userId
   * @returns {string}
   * @constructor
   */
  INVITE_SOCKET(userId:string){
    return `ws://localhost/invite/${userId}`
  }
  /**
   * 动态通知
   * @type {string}
   */
  NOTICE_ART:string ="notice-art/";
  /**
   * 子评论
   * @type {string}
   */
  SUB_DISCUSSION="discussion/sub-discussion";
  /**
   * 给评论点赞
   * @param discussionId 评论ID
   * @returns {string}
   * @constructor
   */
  DISCUSSION_THUMBSUP(discussionId:string){
    return  `discussion/${discussionId}/thumbsUpUserIds`;
  }
  /**
   * 心情点赞
   * @param moodId
   * @returns {string}
   * @constructor
   */

  MOOD_THUMBSUP=`mood/thumbsUpUserIds`;

  /**
   *查询评论等
   */
    DISCUSSION:string="discussion/";

    DELETE_PARENT_DISCUSSION(id:string){
      return `discussion/${id}/parent-discussion`
    }
  /**
   * 父级评论
   * @type {string}
   */
  PARENT_DISCUSSION:string="discussion/parent-discussion";
  /**
   * 心情操作api
   * @type {string}
   */
  MOOD:string="mood/";
  /**
   * 用户的主页信息
   * @type {string}
   */
  HOME_INFO :string= "home/info";

  /**
   * 图片操作
   * @type {string}
   */
  IMG(bucketName:string){

    return "share/img/"+bucketName;
  }

  /**
   * 心情图片缩小参数80X80
   * @type {string}
   */
  UPLOAD_MOOD_NARROW_STYLE:string="?x-oss-process=style/upload-mood-narrow";
  /**
   * 图片前缀
   * @type {string}
   */
  IMAGE_PREFIX:string="http://taomei1314.com/";
  /**
   * 判断能否进入HOME组件
   * @type {string}
   */
  CAN_TO_HOME:string="home/can-to";

  /**
   * 修改用户头像
   * @type {string}
   */
  UPDATE_PROFILE:string="person-info/profile-img";

  /**
   * 操作用户的基本信息
   * @type {string}
   */
  USER_BASE_INFO:string=`person-info/base-info`;

  /**
   * 删除邀请信息
   * @param id 邀请id
   * @returns {string} rest api
   * @constructor
   */
   DELETE_INVITATION_REST(id){
    return "api/invitations/search/deleteByInvitationId?id="+id;
  }
  /**
   * 判断用户能否邀请对方
   * @param userId 邀请人Id
   * @returns {string}
   * @constructor
   */
   CAN_INVITE_ABLE(userId){
    return  `login/user/${userId}/can-invited`;
  }
  /**
   * 判断用户是否能进入邀请另一半界面
   * @type {string}
   */

  TO_INVITE_ABLE:string="login/user/to-invite";
  /**
   * 邀请另一半时获取用户信息
   * @type {string}
   */
  INVITE_USER:string="login/user/invite";
  /**
   *
   * @type {string}获取验证码图片
   */
  VERIFICATION_CODE_IMG :string="share/verificationCodeImg";

  /**
   * 登陆接口
   * @type {string}
   */
  LOGIN:string="login/user";

  /**
   * 注册接口
   * @type {string}
   */
  REGISTER:string="register/user";

}
