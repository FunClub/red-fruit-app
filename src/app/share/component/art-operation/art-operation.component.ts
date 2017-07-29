import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-art-operation',
  templateUrl: './art-operation.component.html',
  styleUrls: ['./art-operation.component.css']
})
export class ArtOperationComponent implements OnInit {
  isDiscussOpen=false;
  constructor() { }

  ngOnInit() {

  }
  openDiscussion(){
   this.isDiscussOpen=!this.isDiscussOpen;
  }
}
