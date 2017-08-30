import {Component, ElementRef, OnInit} from '@angular/core';

import {HomeService} from "../../../home/service/home.service";
import {NavLink} from "../../../share/model/base/nav-link.model";
declare var $:any;
@Component({
  selector: 'app-person-center',
  templateUrl: './person-center.component.html',
  styleUrls: ['./person-center.component.css']
})
export class PersonCenterComponent implements OnInit {

  navLinks:Array<NavLink>;
  constructor(private ref :ElementRef,private homeService:HomeService) {
    this.navLinks=[
      {path:'home-page',label:'个人主页'},
      {path:'memory-day',label:'纪念日'},
      {path:'mood',label:'心情'},
      {path:'note',label:'日志'},
      {path:'album',label:'相册'},
      {path:'leave-message',label:'留言板'}
    ]
  }

  ngOnInit() {

      $(".mat-sidenav-content").css("position","relative");

  }

}
