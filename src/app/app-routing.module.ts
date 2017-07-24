import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/component/login/login.component";
import {HomeComponent} from "./home/component/home/home.component";
import {LoginBodyComponent} from "./login/component/login-body/login-body.component";
import {InviteBodyComponent} from "./login/component/invite-body/invite-body.component";
import {InviteGuard} from "./login/guard/invite.guard";
const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent,
    children:[
      {path:'',component:LoginBodyComponent},
      {path:'invite-half',component:InviteBodyComponent,canActivate:[InviteGuard]}
    ]
  },
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
