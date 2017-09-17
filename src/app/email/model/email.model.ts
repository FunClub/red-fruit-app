/**
 * 插入邮件模型
 */
export class InsertEmail {
  receiveUserId:string;
  emailContents:InsertEmailContent[];
}
/**
 * 插入邮件内容模型
 */
export class InsertEmailContent{
  content:string;
  state:string;

  constructor() {
    this.state = "未读";
  }
}
