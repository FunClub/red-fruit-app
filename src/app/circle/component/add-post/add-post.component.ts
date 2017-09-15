import {Component, Inject, OnInit} from '@angular/core';
import {EditorArgs} from "../../../share/model/base/editor-args";
import {MD_DIALOG_DATA} from "@angular/material";
import {Post} from "../../model/post.model";
import * as $ from 'jquery';
import {CircleService} from "../../service/circle.service";
import {ToastsManager} from "ng2-toastr";
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  /**
   * 编辑器参数
   */
  editorArgs:EditorArgs;

  /**
   * 帖子
   */
  post:Post;
  constructor(@Inject(MD_DIALOG_DATA) private circleName:string,private circleService:CircleService,
  private toastsManager:ToastsManager
  ) {
    this.post = new Post();
    this.post.circleName=circleName;
    this.post.anonymous=false;
    this.initEditorArgs();
  }
  ngOnInit() {

  }

  /**
   * 发布帖子
   */
  publishPost(close){
    this.post.title=this.editorArgs.title;
    this.post.content=this.editorArgs.content;
    this.post.original=true;
    $(".fr-view img[src^='http://taomei1314.com']").each((index, element)=>{
      this.post.imgs.push($(element).attr("src"));
      if(this.post.imgs.length==7) return false;
    });
    this.circleService.insertPost(this.post).subscribe(res=>{
      if(res){
        this.toastsManager.success("帖子发布成功","发布结果");
      }else{
        this.toastsManager.error("帖子发布失败","发布结果")
      }
    })
  }
  /**
   * 匿名切换
   * @param event
   */
  anonymousChanged(event){
    this.post.anonymous=event.checked;
  }

  /**
   * 初始化编辑器参数
   */
  initEditorArgs(){
    this.editorArgs = new EditorArgs();
    this.editorArgs.type="帖子";
  }
}
