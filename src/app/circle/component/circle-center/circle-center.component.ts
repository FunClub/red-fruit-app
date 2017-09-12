import { Component, OnInit } from '@angular/core';
import {circleData} from '../../../share/model/base/static-data.model'
import {CircleData} from "../../model/circle-data.model";
import {SelectPostCondition, ShowPost} from "../../model/post.model";
import {CircleService} from "../../service/circle.service";
@Component({
  selector: 'app-circle-center',
  templateUrl: './circle-center.component.html',
  styleUrls: ['./circle-center.component.css']
})
export class CircleCenterComponent implements OnInit {
  /**
   * 圈子静态数据
   */
  circleStaticData:CircleData[];

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

  /**
   * 帖子查询条件
   */
  selectCondition:SelectPostCondition;
  constructor(private circleService:CircleService) {
    this.circleStaticData=circleData;
    this.selectCondition = new SelectPostCondition();
    this.selectCondition.sortBy="hot";
  }
  ngOnInit() {
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
   * 查询帖子
   */
  selectPosts(){
    this.circleService.selectPosts(this.selectCondition).subscribe(res=>{
      this.totalElement=res.totalElements;
      this.posts = res.content;
    });
  }
}
