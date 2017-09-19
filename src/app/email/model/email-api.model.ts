/**
 * 邮件api
 */
export class EmailApi {
  DELETE_EMAIL:string ="email/delete";
  /**
   * 添加邮件内容
   * @type {string}
   */
  ADD_EMAIL_CONTENT:string="email/email-content";
  /**
   * 查询邮件
   * @param emailId 邮件id
   * @return {string}
   * @constructor
   */
  SELECT_EMAIL(emailId:string){
    return `email/${emailId}`
  }
  /**
   * 查询日志目录
   * @type {string}
   */
  CATALOG:string="email/catalog";
  /**
   * 收件人信息
   * @param userId 用户Id
   * @return {string}
   * @constructor
   */
  RECEIVE_USER(userId:string){
    return `email/${userId}/receive-user`;
  }

  /**
   * 插入邮件
   * @type {string}
   */
  INSERT_EMAIL:string="/email/";
}
