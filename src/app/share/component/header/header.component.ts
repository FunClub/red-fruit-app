import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * 标题头
   */
  @Input()
  headerTitle:string
  constructor() { }

  ngOnInit() {
  }

}
