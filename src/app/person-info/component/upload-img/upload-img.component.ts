import {Component, OnInit, ViewChild} from '@angular/core';
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {PersonInfoService} from "../../person-info.service";
import {ToastsManager} from "_ng2-toastr@4.1.2@ng2-toastr/src/toast-manager";
import {ToastOptions} from "ng2-toastr";
import {NgProgressService} from "ngx-progressbar";
import {ProfileInfo} from "../../model/profile-info";
import {HomeService} from "../../../home/service/home.service";
import {Home} from "../../../home/model/home.model";

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {


  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;
  data: any;
  cropperSettings: CropperSettings;
  /**
   * 存储原始图像，便于取消操作还原
   */
  tempOriginalProfileImg:string;
  constructor(private personInfoService:PersonInfoService,private toastsManager:ToastsManager,
  private toastOptions:ToastOptions,private ngProgressService:NgProgressService,private profileInfo:ProfileInfo,
              private homeService:HomeService
  ) {

    this.setUpCropper();
  };
  ngOnInit(){

  }
  /**
   * 设置Cropper
   */
  setUpCropper(){
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth =150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 450;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput=true;
    this.data = {image:this.personInfoService.personBaseInfo.profileImg};
    this.tempOriginalProfileImg=this.personInfoService.personBaseInfo.originalProfileImg;
  }

  /**
   * 图片选择事件
   * @param $event
   */
  fileChangeListener($event) {
    let image:any = new Image();
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();
    myReader.onloadend =(loadEvent:any)=>{
      image.src = loadEvent.target.result;
     this.tempOriginalProfileImg =image.src;
      this.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);

  }


  /**
   * 讲原始图形显示在画布上
   */
  ngAfterViewInit(){
    var image:any = new Image();
    image.src=this.personInfoService.personBaseInfo.originalProfileImg;
    this.cropper.setImage(image);
  }

  /**
   * 关闭提示框
   * @param close
   */
  closeDialog(close:HTMLButtonElement){
    close.click();
}

  /**
   * 更新头像
   */
  doUpdate(close:HTMLButtonElement){
   this.profileInfo.profileImg=this.data.image;
   this.profileInfo.originalProfileImg=this.tempOriginalProfileImg;
   this.ngProgressService.start();
   this.personInfoService.updateProfileImg(this.profileInfo).subscribe(res=>{
     this.ngProgressService.done();
     if(res){
       //更新主页数据
       this.homeService.homeInfo.profileImg= this.profileInfo.profileImg;
       this.toastsManager.success("头像修改成功","修改结果",this.toastOptions);
       //保存更新结果
       this.personInfoService.personBaseInfo.originalProfileImg= this.profileInfo.originalProfileImg;
       this.personInfoService.personBaseInfo.profileImg= this.profileInfo.profileImg;
     }else{
       this.toastsManager.error("头像修改失败","修改结果",this.toastOptions);
     }
     close.click();
   });
  }
}
