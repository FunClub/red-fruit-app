import {Component, EventEmitter, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {RfEditorOptions} from "../../model/rf-editor-options.model";

@Component({
  selector: 'app-art-operation',
  templateUrl: './art-operation.component.html',
  styleUrls: ['./art-operation.component.css'],
  animations:[
    trigger('flyInFromTop', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-5%)'}),
          style({opacity: 0.5, transform: 'translateY(5px)'}),
          style({opacity: 1, transform: 'translateY(0)'})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(-5px)'}),
          style({opacity: 0, transform: 'translateY(5%)'})
        ]))
      ])
    ]),
    trigger('flyXInOutFromLeft', [
      transition('void => *', [
        animate("300ms",keyframes([
          style({opacity: 0, transform: 'translateY(-5%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(5px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("300ms",keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(5px)'}),
          style({opacity: 0, transform: 'translateY(-5%)'})
        ]))
      ])
    ])
  ]
})
export class ArtOperationComponent implements OnInit {
  isDiscussOpen=false;
  ngOnInit() {
  }
  openDiscussion(){
    this.isDiscussOpen=!this.isDiscussOpen;
  }
}
