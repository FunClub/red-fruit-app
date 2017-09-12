import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  img="http://red-fruit.oss-cn-shenzhen.aliyuncs.com/profile/20170815194635-44095884520160925141201400409029QQ%E6%88%AA%E5%9B%BE20160925141102.png"
  constructor() { }

  ngOnInit() {
  }

}
