import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/component/login/login.component";
import {HomeComponent} from "./home/component/home/home.component";
import {APP_BASE_HREF} from "_@angular_common@4.3.0@@angular/common/common";
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'home', loadChildren:'app/home/home.module#HomeModule'},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [
    /**
     * 采用hash路径的方式预加载模块
     */
    RouterModule.forRoot(appRoutes,{useHash:true,preloadingStrategy:PreloadAllModules})
  ],
  exports:[RouterModule],

  declarations: []
})
export class AppRoutingModule { }
