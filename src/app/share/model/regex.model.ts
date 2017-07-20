/**
 * 正则表达式模型
 */
export class Regex {
  /**
   * 邮箱正则表达式
   * @type {RegExp}
   */
  EMAIL_REGEX = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
}
