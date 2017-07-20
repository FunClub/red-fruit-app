import {Component, ElementRef, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {RedFruitApi} from "../../../share/model/api.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title:Title, private toastsManager: ToastsManager,
              private vcr: ViewContainerRef, private toastOptions:ToastOptions) {
    this.toastsManager.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.title.setTitle("红果-主页")
  }

  /**
   * 解决导航滑动第一次失效的bug
   */
  killnNavToggleBug(){/*do no thing...*/}
}
