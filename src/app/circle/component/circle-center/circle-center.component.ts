import { Component, OnInit } from '@angular/core';
import {circleData} from '../../../share/model/base/static-data.model'
import {CircleData} from "../../model/circle-data.model";
@Component({
  selector: 'app-circle-center',
  templateUrl: './circle-center.component.html',
  styleUrls: ['./circle-center.component.css']
})
export class CircleCenterComponent implements OnInit {
  circleStaticData:CircleData[];
  constructor() {
    this.circleStaticData=circleData;

  }

  ngOnInit() {
  }

}
