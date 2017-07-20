import {Component, ElementRef, OnInit} from '@angular/core';

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
      {path:'note',label:'日志'}
    ]
  }

  ngOnInit() {

  }

}
