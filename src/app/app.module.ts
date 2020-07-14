import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 使用[(ngModel)]="hero.name"双向绑定　，需要导入
import { FormsModule } from '@angular/forms';

// 导入路由
import { AppRoutingModule } from './app-routing.module';

// 导入组件
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
