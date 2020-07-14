import { NgModule } from '@angular/core';
// 配置路由
import { RouterModule, Routes } from '@angular/router';
// 导入组件
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // path 中的冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id。
  { path: 'detail/:id', component: HeroDetailComponent },

];


// @NgModule 元数据会初始化路由器，并开始监听浏览器地址的变化
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
