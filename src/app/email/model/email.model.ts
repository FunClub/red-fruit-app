import {PageRequest} from "../../share/model/base/page-request.model";
import {PagedData} from "../../share/model/base/paged-data";
/**
 * 添加邮件内容的模型
 */
export class AddEmailContent{
  emailId:string;
  emailContent:InsertEmailContent;
}
/*显示邮件的模型*/
export class ShowEmail{
  emailId:string;
  emailUserId:string;
  nickname:string;
  profileImg:string;
  sex:string;
  character:string;
  city:string;
  profession:string;
  emailContents:ShowEmailContent[];
}
/*显示邮件内容的模型*/
export class ShowEmailContent{
  nickname:string;
  date:string;
  content:string;
  sex:string;
}
/**
 * 显示邮件目录的模型
 */
export class ShowEmailCatalog{
  emailId:string;
  profileImg:string;
  nickname:string;
  city:string;
  sex:string;
  howLongAgo:string;
  emailContentSize:string;
  whoSend:string;
  state:string;
  selected:boolean;
}
/**
 * 插入邮件模型
 */
export class InsertEmail {
  receiveUserId:string;
  emailContents:InsertEmailContent[];
  fromState:boolean;
  receiveState;boolean;
  constructor() {
    this.fromState = true;
    this.receiveState = false;
  }
}
/**
 * 插入邮件内容模型
 */
export class InsertEmailContent{
  content:string;
}
/**
 * 查询邮件目录模型
 */
export class SelectEmailCatalog extends PageRequest{

}

export class EmailPagedData extends PagedData{
  unReadCount:number;
}
