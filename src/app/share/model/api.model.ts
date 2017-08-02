/**
 * 应用api
 */
export  class RedFruitApi {

  /**
   * 心情图片
   * @type {string}
   */
  MOOD_IMG:string="share/mood-img";
  /**
   * 心情图片缩小参数80X80
   * @type {string}
   */
  UPLOAD_MOOD_NARROW_STYLE:string="?x-oss-process=style/upload-mood-narrow";
  /**
   * 图片前缀
   * @type {string}
   */
  IMAGE_PREFIX:string="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/";
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
  USER_BASE_INFO:string="person-info/base-info";
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
