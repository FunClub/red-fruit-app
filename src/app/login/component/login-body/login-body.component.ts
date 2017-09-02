import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewContainerRef} from '@angular/core';
import {NgProgressService} from 'ngx-progressbar';
import 'rxjs/add/operator/map';
import {Title} from "@angular/platform-browser";
import {MdDialog} from "@angular/material";
import {RegisterComponent} from "../../../register/component/register/register.component";
import {ToastOptions, ToastsManager} from "ng2-toastr";

import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Regex} from "../../../share/model/regex.model";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {BaseToastsOptions} from "../../../share/model/base/toasts-options.model";

@Component({
  selector: 'app-login-body',
  templateUrl: './login-body.component.html',
  styleUrls: ['./login-body.component.css']
})
export class LoginBodyComponent implements OnInit {


  loginForm: FormGroup;
  account: FormControl;
  passwords: FormControl;

  /**
   *
   * @param titleService 注入title服务，用于改变标题内容
   * @param dialog 注入material的提示框服务
   * @param toastsManager 注入toastsManager
   * @param vcr
   * @param toastOptions 注入提示框配置
   * @param progressService 注入进度条服务
   * @param forBuilder 响应式表单创建器
   * @param reg
   * @param loginService
   * @param router
   */
  constructor(private titleService: Title, private  dialog: MdDialog,
              private toastsManager: ToastsManager, private vcr: ViewContainerRef,
              private toastOptions: ToastOptions, private progressService: NgProgressService,
              private forBuilder: FormBuilder, private reg: Regex, private loginService: LoginService,
              private router: Router) {
    this.toastsManager.setRootViewContainerRef(vcr);
  }

  /**
   * 初始化登录组件
   * 1.设置标题
   */
  ngOnInit() {
    this.titleService.setTitle("红果情侣-登录");
    this.createForm();
  }

  createForm() {
    this.loginForm = this.forBuilder.group({
      "account": [
        "", [], []
      ],
      "passwords": [
        "", [], []
      ]
    });
    this.account = this.loginForm.get("account") as FormControl;
    this.account = this.loginForm.get("passwords") as FormControl;

  }

  /**
   * 显示注册模态框
   * 从RegisterComponent加载内容到模态框
   */
  openRegisterModal() {
    let re = this.dialog.open(RegisterComponent, {

      disableClose: true
    });
  }

  /**
   * 登录操作，没有另一半就进入邀请界面否则进入主界面
   */
  doLogin() {
    if (this.checkLoginInfo()) {
      this.progressService.start();

      this.loginService.login(this.loginForm.value).subscribe(res => {
        this.progressService.done();
        if (res.code==200) {
          //有另一半就直接调到主界面
          if(res.data.hasHalf){
            this.router.navigateByUrl("home");
          }else{
            this.router.navigate(["login/invite-half"]);
          }
        } else {
          this.toastsManager.error("账号密码错误，请重试...", "登录信息", this.toastOptions);
        }
      });
    }

  }

  /**
   * 登陆数据效验
   * @returns {boolean} true则校验通过
   */
  checkLoginInfo(): boolean {
    let accountVal = this.loginForm.value.account;
    let passwordValLength = this.loginForm.value.passwords.length;
    if (this.reg.EMAIL_REGEX.test(accountVal) && passwordValLength >= 6 && passwordValLength <= 12) {
      return true;
    } else {
      this.toastsManager.error("账号或密码错误，请重试...", "登录信息", this.toastOptions);
      return false;
    }

  }

}
