import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {cities,professions,hobbies,characters} from "../../../share/model/static-data.model"
import {PersonInfoService} from "../../person-info.service";
import {BaseInfo} from "../../model/base-info";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {parseDatepickerDate} from "../../../share/utils/time-util";
import {NgProgressService} from "_ngx-progressbar@2.0.3@ngx-progressbar";
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
              private toastsManager: ToastsManager,private ngProgressService:NgProgressService,
              private toastOptions: ToastOptions
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
    this.personInfoService.selectUserBaseInfo().subscribe(res=>{
      this.baseInfo=res;
      this.resetControl();
      this.ngProgressService.done();
    });

  }

  /**
   * 保存用户修改的数据
   */
  doUpdate(){
    this.ngProgressService.start();
    let updateInfo  = this.infoGroup.value;
    updateInfo.born=parseDatepickerDate(updateInfo.born);
    updateInfo.userId=this.baseInfo.userId;
    this.personInfoService.updateUserBaseInfo(updateInfo).subscribe(res=>{
      this.ngProgressService.done();
      if(res){
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
    this.nicknameControl.reset(this.baseInfo.nickname);
    this.hobbyControl.reset(this.baseInfo.hobby);
    this.cityControl.reset(this.baseInfo.city);
    this.professionControl.reset(this.baseInfo.profession);
    this.characterControl.reset(this.baseInfo.character);
    this.bornControl.reset(this.baseInfo.born);
    this.sexControl.reset(this.baseInfo.sex);
  }
  createForm(){
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
