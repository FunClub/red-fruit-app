import { Component, OnInit } from '@angular/core';
import {NavLink} from "../../../share/model/base/nav-link.model";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  navLinks:Array<NavLink>;
  constructor() {
    this.navLinks=[
      {path:'email-list',label:'我的邮箱'},
      {path:'write-email',label:'写邮件'}
    ];
  }
  ngOnInit() {
  }

}
