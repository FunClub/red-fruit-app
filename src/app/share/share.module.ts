import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Regex} from "./model/regex.model";
import {RedFruitApi} from "./model/api.model";
import {ToastOptions} from "ng2-toastr";
import {BaseToastsOptions} from "./model/toasts-options.model";
import { FooterComponent } from './component/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[FooterComponent,ReactiveFormsModule],
  providers:[
    /*注入全局的api*/
    RedFruitApi,
    /*注入全局的ng2ToastOptions*/

    /*注入正则表达式模型*/
    Regex
  ],
  declarations: [FooterComponent]
})
export class ShareModule { }
