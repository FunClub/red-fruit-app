import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {AddPostComponent} from "../add-post/add-post.component";
import {ActivatedRoute} from "@angular/router";
import {CircleData} from "../../model/circle-data.model";
import {circleData} from '../../../share/model/base/static-data.model'
import {SelectPostCondition, ShowPost} from "../../model/post.model";
import {CircleService} from "../../service/circle.service";
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

  /**
   * 帖子查询条件
   */
  selectCondition:SelectPostCondition;

  /**
   * 总帖子数量
   */
  totalElement:number;

  /**
   * 帖子数组
   */
  posts:ShowPost[];

  /**
   * 每页分页数量
   * @type {[number,number,number,number]}
   */
  pageSizeOptions = [5, 10, 25, 100];
  constructor(private dialog:MdDialog,private activatedRoute:ActivatedRoute,private circleService:CircleService) {
    this.circleStaticData=circleData;
    let index = activatedRoute.snapshot.params['circleIndex'];
    this.circle=this.circleStaticData[index];

    this.selectCondition = new SelectPostCondition();
    this.selectCondition.sortBy="hot";
    this.selectCondition.circleName=this.circle.name;
  }

  ngOnInit() {
    this.selectPosts();
  }
  openAddPostDialog(){
    this.dialog.open(AddPostComponent,{
      data:this.circle.name
    });
  }
  /**
   * 查询帖子
   */
  selectPosts(){
    this.circleService.selectPost(this.selectCondition).subscribe(res=>{
      this.totalElement=res.totalElements;
      this.posts = res.content;
    });
  }
  /**
   * 帖子类型切换
   * @param event
   */
  toggleSortBy(event){
    if(event.checked){
      this.selectCondition.sortBy='hot';
    }else{
      this.selectCondition.sortBy='latest';
    }
    this.selectPosts();
  }
  /**
   * 页变化
   * @param event
   */
  changePage(event){
    this.selectCondition.pageSize=event.pageSize;
    this.selectCondition.pageIndex =event.pageIndex;
    this.selectPosts();
  }

}
