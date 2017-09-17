import {Component, Inject, OnInit} from '@angular/core';
import {ShareService} from "../../service/share.service";
import {AttentionUser} from "../../model/base/attention-user.model";
import {RedFruitApi} from "../../model/base/api.model";
import {MD_DIALOG_DATA} from "@angular/material";
import {SelectUserArgs} from "../../../email/model/select-user-args.model";

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170815194635-44095884520160925141201400409029QQ%E6%88%AA%E5%9B%BE20160925141102.png";
  attentionUsers:AttentionUser[];
  constructor(@Inject(MD_DIALOG_DATA)public args:SelectUserArgs,private shareService:ShareService,public api:RedFruitApi) {
    this.attentionUsers=args.attentionUsers;
  }

  ngOnInit() {

  }
  selectUser(index:number){
    if(!this.attentionUsers[index].selected){
      this.attentionUsers[index].selected=true;
      this.args.selectedUser=this.attentionUsers[index];
      for(let i=0;i<this.attentionUsers.length;i++){
        if(i!=index){
          this.attentionUsers[i].selected=false;
        }
      }
    }
  }
  /**
   * 关闭dialog
   * @param close
   */
  closeDialog(close:HTMLButtonElement){
    this.args.selectedUser=null;
    close.click();
  }
}
