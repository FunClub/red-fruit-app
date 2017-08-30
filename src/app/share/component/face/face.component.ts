import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Face} from "../../model/base/face.model";


@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css'],

})
export class FaceComponent implements OnInit {
  @Output()
  faceSelected:EventEmitter<string> = new EventEmitter();
  @Output()
  faceOpened:EventEmitter<boolean> = new EventEmitter();
  faces:Face[][];
  constructor() {
    this.initDefaultFace();
  }
  initDefaultFace(){
    let p="assets/face/default/";
    this.faces=[
      [
        {path:p+'huanglianwx_thumb.gif',tip:'微笑'}, {path:p+'mb_thumb.gif',tip:'太开心'},
        {path:p+'laugh.gif',tip:'哈哈'},{path:p+'kl_thumb.gif',tip:'可怜'},{path:p+'heia_thumb.gif',tip:'嘿嘿'},
        {path:p+'gza_thumb.gif',tip:'鼓掌'},{path:p+'lovea_thumb.gif',tip:'可爱'},{path:p+'qq_thumb.gif',tip:'亲一个'}
      ],
      [
        {path:p+'sada_thumb.gif',tip:'泪流满面'}, {path:p+'sb_thumb.gif',tip:'生病了'},
        {path:p+'yx_thumb.gif',tip:'坏笑'},{path:p+'tootha_thumb.gif',tip:'龇牙'},{path:p+'wabi_thumb.gif',tip:'挖鼻'},
        {path:p+'landeln_thumb.gif',tip:'白眼'},{path:p+'x_thumb.gif',tip:'嘘嘘'},{path:p+'bs_thumb.gif',tip:'要哭了'}
      ],
      [
        {path:p+'numav2_thumb.gif',tip:'怒骂'}, {path:p+'zy_thumb.gif',tip:'吐舌'},
        {path:p+'bba_thumb.gif',tip:'棒棒的'},{path:p+'yw_thumb.gif',tip:'疑问'},{path:p+'88_thumb.gif',tip:'拜拜'},
        {path:p+'sweata_thumb.gif',tip:'流汗'},{path:p+'huangliansj_thumb.gif',tip:'打瞌睡'},{path:p+'money_thumb.gif',tip:'好多钱'}
      ],
      [
        {path:p+'huanglianse_thumb.gif',tip:'好色'}, {path:p+'hufen_thumb.gif',tip:'互粉'},
        {path:p+'hatea_thumb.gif',tip:'哼'},{path:p+'angrya_thumb.gif',tip:'大怒'},
        {path:p+'sk_thumb.gif',tip:'思考'},{path:p+'cj_thumb.gif',tip:'吃惊'},{path:p+'t_thumb.gif',tip:'呕吐'},{path:p+'unheart.gif',tip:'心碎'}
      ],
      [{path:p+'hearta_thumb.gif',tip:'爱心'}, {path:p+'ye_thumb.gif',tip:'胜利'},
        {path:p+'z2_thumb.gif',tip:'赞'},{path:p+'sad_thumb.gif',tip:'踩'},{path:p+'horse2_thumb.gif',tip:'神马'},
        {path:p+'j_thumb.gif',tip:'囧'},{path:p+'geiliv2_thumb.gif',tip:'给力'},{path:p+'pig.gif',tip:'猪头'}
      ]

    ]
  }
  ngOnInit() {

  }
  faceClosedEvent(){
    this.faceOpened.emit(false);
  }
  popFacePath(facePath:string){
    let faceImg=`<img src=${facePath} class="a-f">`;
    this.faceSelected.emit(faceImg);
  }
  closeSelf(){

  }
}
