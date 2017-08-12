import { Component, OnInit } from '@angular/core';
import {NavLink} from "../../../share/model/nav-link.model";

@Component({
  selector: 'app-foot-mark',
  templateUrl: './foot-mark.component.html',
  styleUrls: ['./foot-mark.component.css']
})
export class FootMarkComponent implements OnInit {
  navLinks:Array<NavLink>;
  constructor() {
    this.navLinks=[
      {path:'my-art',label:'我的动态'},
    ];
  }

  ngOnInit() {
  }

}
