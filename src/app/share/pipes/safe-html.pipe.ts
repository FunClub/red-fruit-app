import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safeHtml'
})
/**
 * 讲不收信任的html转化为安全的html
 */
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }
  transform(value: any, args?: any): any {
      return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
