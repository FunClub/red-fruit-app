import {Component, Input, OnInit} from '@angular/core';
import {ShareService} from "../../service/share.service";
import {ShowCard} from "../../model/base/show-card.model";
import {RedFruitApi} from "../../model/base/api.model";

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170915010709-2124691452QQ%E5%9B%BE%E7%89%8720170805114350.jpg";
  @Input()
  userId:string;
  card:ShowCard;
  constructor(private shareService:ShareService,public api:RedFruitApi) {
    this.card=new ShowCard();
    this.card
  }

  ngOnInit() {
    this.shareService.selectCard(this.userId).subscribe(res=>{
      this.card=res;
    });
  }

}
