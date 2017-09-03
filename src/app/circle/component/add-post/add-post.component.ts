import {Component, Inject, OnInit} from '@angular/core';
import {EditorArgs} from "../../../share/model/base/editor-args";
import {MD_DIALOG_DATA} from "@angular/material";
import {Post} from "../../model/post.model";
import * as $ from 'jquery';
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
  constructor(@Inject(MD_DIALOG_DATA) private circleId:string) {
    this.post = new Post();
    this.post.circleId=circleId;
    this.post.isAnonymous=false;
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

    $(".fr-view img[src^='http://taomei1314.com']").each((index, element)=>{
      this.post.imgs.push($(element).attr("src"));
    });

  }
  /**
   * 匿名切换
   * @param event
   */
  anonymousChanged(event){
  this.post.isAnonymous=event.checked;
  }

  /**
   * 初始化编辑器参数
   */
  initEditorArgs(){
    this.editorArgs = new EditorArgs();
    this.editorArgs.type="帖子";
  }
}
