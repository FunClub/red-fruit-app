import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {InviteMessage} from "../../../websocket/model/invite-message.model";

@Component({
  selector: 'app-invite-message',
  templateUrl: './invite-message.component.html',
  styleUrls: ['./invite-message.component.css']
})
export class InviteMessageComponent implements OnInit {
  inviteMessage:InviteMessage;
  constructor(private loginService:LoginService) {
    this.inviteMessage= loginService.inviteMessage[0];
  }

  ngOnInit() {

  }

}
