import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {HomeService} from "../service/home.service";

/**
 * home守卫
 *
 * 只有登录了且有另一半才可以进入home界面
 */
@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private homeService:HomeService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.homeService.canToHome();
  }
}
