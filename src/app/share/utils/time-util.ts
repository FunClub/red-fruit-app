/**
 * 讲日期选择器的日期解析为可读日期
 * @param date 日期选择器的时间
 * @returns {any} 可读日期
 */
export function  parseDatepickerDate(date:any){
  /*出生日期的转换*/
  if(typeof date=="object"){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return  year + "/" + month + "/" + day;
  }
  return date;
}
