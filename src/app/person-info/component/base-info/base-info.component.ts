import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {cities,professions,hobbies,characters} from "../../../share/model/base/static-data.model"
import {PersonInfoService} from "../../person-info.service";
import {BaseInfo} from "../../model/base-info";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {parseDatepickerDate} from "../../../share/utils/time-util";

import {MdDialog} from "@angular/material";
import {UploadImgComponent} from "../upload-img/upload-img.component";
import {LoginService} from "../../../login/service/login.service";
import {HomeService} from "../../../home/service/home.service";
import {Home} from "../../../home/model/home.model";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {NgProgressService} from "ngx-progressbar";
@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.css']
})
export class BaseInfoComponent implements OnInit {
  /**
   * 资料fromGroup
   */
  infoGroup:FormGroup;

  /**
   * 昵称control
   */
  nicknameControl:FormControl;

  /**
   * 出生日期control
   */
  bornControl:FormControl;
  /**
   * 城市control
   */
  cityControl:FormControl;

  /**
   * 职业control
   */
  professionControl:FormControl;

  /**
   * 爱好control
   */
  hobbyControl:FormControl;
  /**
   * 性别control
   */
  sexControl:FormControl;

  /**
   * 性格control
   */
  characterControl:FormControl;

  /**
   * 城市下拉数据
   */
  cities:string[];

  /**
   * 职业下拉数据
   */
  professions:string[];


  /**
   * 爱好下拉数据
   */
  hobbies:string[];

  /**
   * 爱好下拉数据
   */
  characters:string[];
  constructor(private formBuilder:FormBuilder,private baseInfo:BaseInfo,private personInfoService:PersonInfoService,
              private toastsManager: ToastsManager,private ngProgressService:NgProgressService,private api:RedFruitApi,
              private toastOptions: ToastOptions,private dialog:MdDialog,private homeService:HomeService,private homeModel:Home
  ) {

    this.cities=cities;
    this.professions=professions;
    this.hobbies=hobbies;
    this.characters=characters;

  }

  /**
   * 创建form并在服务器数据到达时更新数据
   */
  ngOnInit() {
    this.ngProgressService.start();
    this.createForm();
    this.personInfoService.selectUserBaseInfo( this.baseInfo.userId).subscribe(res=>{
      this.baseInfo=res;
      this.personInfoService.personBaseInfo=res;
      this.resetControl();
      this.ngProgressService.done();
    });

  }
  openUploadDialog(){
    this.dialog.open(UploadImgComponent,{
      panelClass:'base-dialog-panel'

    });
  }
  /**
   * 保存用户修改的数据
   */
  doUpdate(){
    this.ngProgressService.start();
    let updateInfo  = this.infoGroup.value;
    updateInfo.born=parseDatepickerDate(updateInfo.born);
    this.personInfoService.updateUserBaseInfo(updateInfo).subscribe(res=>{
      this.ngProgressService.done();
      if(res){
        //更新主页数据
        this.homeService.homeInfo.nickname=updateInfo.nickname;
        this.toastsManager.success("资料修改成功","修改结果",this.toastOptions);
      }else{
        this.toastsManager.warning("资料修改失败","修改结果",this.toastOptions);
      }

    });
  }
  /**
   * 更新form
   */
  resetControl(){
    this.baseInfo.born=new Date(this.baseInfo.born);
    this.nicknameControl.reset(this.baseInfo.nickname);
    this.hobbyControl.reset(this.baseInfo.hobby);
    this.cityControl.reset(this.baseInfo.city);
    this.professionControl.reset(this.baseInfo.profession);
    this.characterControl.reset(this.baseInfo.character);
    this.bornControl.reset(this.baseInfo.born);
    this.sexControl.reset(this.baseInfo.sex);
  }
  createForm(){
    this.baseInfo.born=new Date("1995/1/1");
    this.infoGroup = this.formBuilder.group({
      "nickname":[this.baseInfo.nickname,[],[]],
      "born":[this.baseInfo.born,[],[]],
      "city":[this.baseInfo.city,[],[]],
      "sex":[this.baseInfo.sex,[],[]],
      "profession":[this.baseInfo.profession,[],[]],
      "hobby":[this.baseInfo.hobby,[],[]],
      "character":[this.baseInfo.character,[],[]]
    });
    this.nicknameControl = this.infoGroup.get("nickname") as FormControl;
    this.bornControl = this.infoGroup.get("born") as FormControl;
    this.cityControl = this.infoGroup.get("city") as FormControl;
    this.hobbyControl = this.infoGroup.get("hobby") as FormControl;
    this.characterControl = this.infoGroup.get("character") as FormControl;
    this.professionControl = this.infoGroup.get("profession") as FormControl;
    this.sexControl = this.infoGroup.get("sex") as FormControl;
  }
}
