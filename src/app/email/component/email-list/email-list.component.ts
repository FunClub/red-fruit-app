import { Component, OnInit } from '@angular/core';
import {EmailPagedData, SelectEmailCatalog, ShowEmailCatalog} from "../../model/email.model";
import {EmailService} from "../../service/email.service";
import {RedFruitApi} from "../../../share/model/base/api.model";
import {PagedData} from "../../../share/model/base/paged-data";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170815194635-44095884520160925141201400409029QQ%E6%88%AA%E5%9B%BE20160925141102.png";
  select:SelectEmailCatalog;
  emailCatalogs:ShowEmailCatalog[];
  emailCatalogPage:EmailPagedData;
  ngBusy:any;
  /**
   * 每页分页数量
   * @type {[number,number,number,number]}
   */
  pageSizeOptions = [5, 10, 25, 100];

  /**
   * 是否显示删除邮件管理
   */
  showManager:boolean;

  constructor(private emailService:EmailService,public api:RedFruitApi,private toastsManager:ToastsManager) {
    this.select=new SelectEmailCatalog();
    this.emailCatalogPage = new EmailPagedData();
    this.showManager=false;
  }

  ngOnInit() {
    this.selectEmailCatalog();
  }
  selectEmailCatalog(){
    this.ngBusy=this.emailService.selectEmailCatalog(this.select).subscribe(res=>{
      this.emailCatalogPage = res;
      this.emailCatalogs=res.content;
    })
  }
  /**
   * 页变化
   * @param event
   */
  changePage(event){
    this.select.pageSize=event.pageSize;
    this.select.pageIndex =event.pageIndex;
    this.selectEmailCatalog();
  }

  /**
   * 邮件管理切换
   * @param event
   */
  changeShowManager(event){
    this.showManager=event.checked;
  }

  /**
   * 全选切换
   * @param event
   */
  allSelectToggle(event){
    for (let catalog of this.emailCatalogs){
      catalog.selected=event.source.checked;
    }
  }
  emailSelectedToggle(event,catalog:ShowEmailCatalog){
    catalog.selected=event.checked;
  }
  /**
   * 删除邮件
   */
  deleteEmail(){
    this.emailService.deleteEmail(this.emailCatalogs).subscribe(res=>{
      if(res){
        this.toastsManager.success("邮件删除成功","删除结果");
        this.selectEmailCatalog();
      }else{
        this.toastsManager.error("邮件删除失败...请重试","删除结果");
      }
    });
  }
}
