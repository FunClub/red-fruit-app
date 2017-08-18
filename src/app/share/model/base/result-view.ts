/**
 * 后台返回的统一数据对象
 */
export class ResultView {
  /**
   * 状态码
   */
  code:number;

  /**
   * 附加消息
   */
  message:string;

  /**
   * 真实数据
   */
  data:any;
}
