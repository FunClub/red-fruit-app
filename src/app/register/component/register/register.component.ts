import {Component, OnInit} from '@angular/core';
import {RedFruitApi} from "../../../share/model/base/api.model";
import {
  FormBuilder, FormControl, FormGroup, ValidationErrors,
  Validators
} from "@angular/forms";
import {Regex} from "../../../share/model/regex.model";
import {RegisterService} from "../../service/register.service";
import {Observable} from "rxjs";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {NgProgressService} from "ngx-progressbar";
import {cities} from "../../../share/model/base/static-data.model"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * 表单
   */
  registerForm: FormGroup;

  /**
   * 账号
   */
  account: FormControl;

  /**
   * 密码
   */
  passwords: FormControl;

  /**
   * 性别
   */
  sex: FormControl;

  /**
   * 出生日期
   */
  born: FormControl;

  /**
   * 居住地
   */
  city: FormControl;
  /**
   * 验证码
   */
  verificationCode: FormControl;
  /**
   *城市数组，遍历生成下拉选项
   *
   */
  cities: Array<string>;

  /**
   * 依赖注入所需对象
   * @param api api接口
   * @param regex 正则表达式
   * @param formBuilder 响应式表单创建器
   * @param registerService 注册服务
   * @param toastsManager 提示框
   * @param toastOptions 提示框配置
   * @param progressService 进度条服务
   */
  constructor(public api: RedFruitApi, private regex: Regex,
              private formBuilder: FormBuilder, private registerService: RegisterService,
              private toastsManager: ToastsManager, private toastOptions:ToastOptions,
              private progressService:NgProgressService
  ) {
    this.cities = cities;
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   * 注册用户
   */
  register(close:HTMLButtonElement,codeImg:HTMLImageElement) {
    this.progressService.start();
    this.registerService.register( this.preRegisterDto()).subscribe(res=>{
      this.progressService.done();
      if(res){
        this.toastsManager.success("注册成功，请登录","注册信息",this.toastOptions);

      }else {
        this.toastsManager.error("注册失败，请重试","注册信息",this.toastOptions);
      }
      close.click();
    });

  }

  /**
   * 重置form,清空错误信息
   */
/*  clearForm(){
    this.account.setErrors(null);
    this.passwords.setErrors(null);
    this.verificationCode.setErrors(null);
  }*/

  /**
   * 将form表单数据转换为数据传输对象
   * @returns {{user: any, verificationCode: any}} 数据传输对象
   */
  preRegisterDto():any{
    let registerInfo = this.registerForm.value;
    let code = registerInfo.verificationCode;
    delete registerInfo.verificationCode;
    let obj = registerInfo.born;
    /*出生日期的转换*/
    if(typeof obj=="object"){
      let year = obj.getFullYear();
      let month = obj.getMonth() + 1;
      let day = obj.getDate();
      registerInfo.born = year + "/" + month + "/" + day;
    }

    let registerDto = {
      "user": registerInfo,
      "verificationCode": code
    };
    return registerDto;
  }

  /**
   * 创建响应式表单
   * 注意：在声明异步验证器的时候一定要将所需服务传过去，不然会出现undefined;
   * 下面的例子是错的：
   * createForm(){
   *     this.registerForm=this.formBuilder.group({
   *       "account":[this.registerModel.account//绑定模型,[]//简单验证器,[this.canRegisterAble]//自定义验证器]
   *     })
   *  }
   * canRegisterAble(control: FormControl){
   * //registerService是undefined
   *  return this.registerService.canRegisterAble(control.value);
   * }
   */
  createForm() {
    this.registerForm = this.formBuilder.group({
      "account": [
        "", [
          Validators.required,
          Validators.pattern(this.regex.EMAIL_REGEX)
        ], [
          (control: FormControl) => {
            return this.canRegisterAbleValidator(control, this.registerService)
          }
        ]
      ],
      "sex": [
        "1"
      ],
      "passwords": [
        "", [Validators.required, Validators.minLength(6), Validators.maxLength(12)], []
      ],
      "born": [
        new Date("1995/1/1"), [], []
      ],
      "verificationCode": [
        "", [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
        [(control: FormControl) => {
          return this.actualVerificationCodeValidator(control, this.registerService)
        }]
      ],
      "city": [
        "重庆", [], []
      ]
    });
    this.account = this.registerForm.get("account") as FormControl;
    this.passwords = this.registerForm.get("passwords") as FormControl;
    this.verificationCode = this.registerForm.get("verificationCode")  as FormControl;
  }

  /**/
  /**
   *账号能否被注册的异步验证器
   * @param accountControl 账号输入框控件
   * @param registerService 注册服务
   * @returns {any} 可观察的验证信息
   * 返回null数据则表示表单控件验证通过，反之亦然
   */
  canRegisterAbleValidator(accountControl: FormControl, registerService: RegisterService): Observable<ValidationErrors | null> {
    if (accountControl.hasError("pattern") == false && accountControl.value != null && accountControl.value != '') {
      return this.registerService.canRegisterAble(accountControl.value);
    } else {
      return Observable.of(null);
    }

  }

  /**
   * 验证验证码的正确性
   * @param codeControl 验证码输入控件
   * @param registerService 注册服务
   * @returns {any} 可观察的验证信息
   * 返回null数据则表示表单控件验证通过，反之亦然
   */
  actualVerificationCodeValidator(codeControl: FormControl, registerService: RegisterService): Observable<ValidationErrors | null> {
    if (codeControl.value != null && codeControl.value != '') {
      return this.registerService.verificationCodeActually(codeControl.value);
    } else {
      return Observable.of(null);
    }
  }

  /**
   * 更换验证码
   * @param img 验证码img dom元素
   */
  changeVerificationCodeImg(img: HTMLImageElement) {
    img.setAttribute("src", this.api.VERIFICATION_CODE_IMG + "?" + Math.random());
  }

}
