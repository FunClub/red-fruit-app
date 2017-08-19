/**
 * 主页模型
 */
export class Home {
  userId:string;
  profileImg:string;
  nickname:string;

  constructor() {
    this.profileImg="static/defaultMeImg.png";
    this.nickname="";
  }
}
