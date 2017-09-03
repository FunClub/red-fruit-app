import { Component, OnInit } from '@angular/core';
import {NavLink} from "../../../share/model/base/nav-link.model";

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

  navLinks:Array<NavLink>;
  constructor() {
    this.navLinks=[
      {path:'/home/circle-center',label:'圈子中心'},
      {path:'circle-center1',label:'我的发帖'},
    ];
  }

  ngOnInit() {
  }

}
