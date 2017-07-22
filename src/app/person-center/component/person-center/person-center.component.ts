import {Component, ElementRef, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-person-center',
  templateUrl: './person-center.component.html',
  styleUrls: ['./person-center.component.css']
})
export class PersonCenterComponent implements OnInit {

  navLinks:Array<any>;

  constructor(private ref :ElementRef) {
    this.navLinks=[
      {path:'home-page',label:'我的主页'},
      {path:'mood',label:'心情'},
      {path:'memory-day',label:'纪念日'},
      {path:'note',label:'日志'},
      {path:'album',label:'相册'},
      {path:'leave-message',label:'留言板'}
    ]
  }

  ngOnInit() {

  }

}
