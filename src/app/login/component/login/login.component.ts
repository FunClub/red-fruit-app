import {Component} from '@angular/core';
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})export class LoginComponent{
  constructor(public loginService:LoginService) {
    loginService.headerTitle="欢迎登录"
  }


}
