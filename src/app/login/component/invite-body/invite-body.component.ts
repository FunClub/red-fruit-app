import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-invite-body',
  templateUrl: './invite-body.component.html',
  styleUrls: ['./invite-body.component.css']
})
export class InviteBodyComponent implements OnInit {
  inviteUser={userId:'',nickname:''};
  /**
   * 邀请的form
   */
  inviteForm:FormGroup;

  /**
   * 被邀请人
   */
  inviteIdControl:FormControl;

  constructor(private loginService:LoginService,private title:Title,private formBuilder:FormBuilder) {
    loginService.headerTitle="邀请另一半";
    title.setTitle("红果情侣-邀请另一半");
  }

  ngOnInit() {
    this.createForm();
    this.loginService.getInviteUserInfo().subscribe(res=>this.inviteUser=res);
  }
  createForm(){
      this.inviteForm=this.formBuilder.group({
        "invitedId":[
          "",[Validators.required,Validators.minLength(6)],[(control: FormControl) => {
            return this.canInviteAble(control, this.loginService)
          }]
        ]
      });
      this.inviteIdControl=this.inviteForm.get('invitedId') as FormControl;
  }
  canInviteAble(invitedIdControl:FormControl,loginService:LoginService):Observable<ValidationErrors | null>{
    let invitedId = invitedIdControl.value;

    if(invitedId.length>=6){
      return this.loginService.canInviteAble(invitedId);
    }
  }
}
