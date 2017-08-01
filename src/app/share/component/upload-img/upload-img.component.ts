import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageUploadService} from "../../service/image-upload.service";
import {RedFruitApi} from "../../model/api.model";

@Component({
  selector: 'app-upload-mood-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {
  @Output()
  closeUploadImg=new EventEmitter<boolean>();
  constructor(private uploadServie:ImageUploadService,public api:RedFruitApi) { }
  preUploadImgs:string[]=[];
  ngOnInit() {

  }
  closeSelf(){
    this.closeUploadImg.emit(false);
  }
  upload(event){
    let formData = new FormData();
    let files = event.target.files;
    let count=this.preUploadImgs.length;
    for(let file of files){
      if(count==8){break;}
      formData.append("moodImgs",file);
      count++;
    }
    this.uploadServie.uploadMoodImg(formData).subscribe(res=>{
      this.preUploadImgs= this.preUploadImgs.concat(res);
    });
  }
}
