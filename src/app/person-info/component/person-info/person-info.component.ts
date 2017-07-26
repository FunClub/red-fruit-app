import { Component, OnInit } from '@angular/core';
import {NavLink} from "../../../share/model/nav-link.model";

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {
  navLinks:Array<NavLink>;
  constructor() {
    this.navLinks=[
      {path:'base-info',label:'基本资料'},
      {path:'privacy-settings',label:'隐私设置'}
    ];
  }

  ngOnInit() {
  }

}
