import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageUploadService} from "../../service/image-upload.service";
import {RedFruitApi} from "../../model/api.model";
import {MoodService} from "../../../person-center/service/mood.service";

@Component({
  selector: 'app-upload-mood-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {
  /**
   * 通知父元素关闭本组件
   * @type {EventEmitter<boolean>}
   */
  @Output()
  closeUploadImg=new EventEmitter<boolean>();
  constructor(private uploadService:ImageUploadService,public api:RedFruitApi,private moodService:MoodService) { }

  /**
   * 从父组件传来图片地址数据，用于关闭本组件后,再次打开依旧显示图片
   * @type {Array}
   */
  @Input()
  preUploadImgs:string[]=[];

  /**
   * 上传图片的订阅,用于显示操作提示
   */
  uploadSubscribe;

  /**
   * 删除图片的订阅,用于显示操作提示
   */
  deleteSubscribe;
  ngOnInit() {

  }

  /**
   * 关闭本组件
   * 删除所有待上传图片,并更新心情服务的待上传图片数据
   */
  closeSelf(){
    if(this.preUploadImgs.length>0){
      this.deleteSubscribe=this.uploadService.deleteMoodImg(this.preUploadImgs).subscribe(res=>{
        if(res){this.preUploadImgs=[]}
        this.updateMoodServiceImg();
        this.closeUploadImg.emit(false);
      });
    }else{
      this.closeUploadImg.emit(false);
    }


  }

  /**
   * 上传图片
   * 最多上传8张,并更新心情服务的待上传图片数据
   * @param event 文件上传事件
   */
  upload(event){
    let formData = new FormData();
    let files = event.target.files;
    let count=this.preUploadImgs.length;
    for(let file of files){
      if(count==8){break;}
      formData.append("moodImgs",file);
      count++;
    }
    this.uploadSubscribe=this.uploadService.uploadMoodImg(formData).subscribe(res=>{
      this.preUploadImgs= this.preUploadImgs.concat(res);
      this.updateMoodServiceImg();
    });
  }

  /**
   * 删除指定图片,并更新心情服务的待上传图片数据
   * @param index
   */
  deleteMoodImg(index:number){
    let paths=[this.preUploadImgs[index]];
    this.deleteSubscribe=this.uploadService.deleteMoodImg(paths).subscribe(res=>{
      if(res){this.preUploadImgs.splice(index,1);}
      this.updateMoodServiceImg();
    });
  }

  /**
   * 更新心情服务的待上传图片数据
   */
  updateMoodServiceImg(){
    this.moodService.sharePreUploadImgs= this.preUploadImgs;
  }

  /**
   * 保存按钮，直接关闭本组件
   */
  save(){
    this.closeUploadImg.emit(false);
  }
}
