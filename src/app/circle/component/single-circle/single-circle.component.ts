import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {AddPostComponent} from "../add-post/add-post.component";
import {ActivatedRoute} from "@angular/router";
import {CircleData} from "../../model/circle-data.model";
import {circleData} from '../../../share/model/base/static-data.model'
@Component({
  selector: 'app-single-circle',
  templateUrl: './single-circle.component.html',
  styleUrls: ['./single-circle.component.css']
})
export class SingleCircleComponent implements OnInit {
  /**
   * 圈子静态数据
   */
  circleStaticData:CircleData[];

  /**
   * 当前圈子数据
   */
  circle:CircleData;
  constructor(private dialog:MdDialog,private activatedRoute:ActivatedRoute) {
    this.circleStaticData=circleData;
    let index = activatedRoute.snapshot.params['circleIndex'];
    this.circle=this.circleStaticData[index];
  }

  ngOnInit() {
  }
  openAddPostDialog(){
    this.dialog.open(AddPostComponent,{
      data:this.circle.id
    });
  }
}
