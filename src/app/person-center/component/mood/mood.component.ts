import { Component, OnInit } from '@angular/core';
import {RfEditorOptions} from '../../../share/model/rf-editor-options.model'
@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {
  constructor(public rfOptions:RfEditorOptions) {
    rfOptions.placeholderText="今天，有什么不高兴的事吗，写写吧"
  }

  ngOnInit() {
  }

}
