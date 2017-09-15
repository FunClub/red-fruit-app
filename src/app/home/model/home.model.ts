/**
 * 主页模型
 */
export class Home {
  userId:string;
  halfId:string;
  profileImg:string;
  nickname:string;
  halfUserId:string;
  halfNickname:string;
  halfProfileImg:string;
  constructor() {
    this.profileImg="static/defaultMeImg.png";
    this.nickname="";
  }
}
