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

//+ HttpClient 是 Angular 通过 HTTP 与远程服务器通讯的机制
import { HttpClientModule } from '@angular/common/http';

// 使用 内存 Web API模拟出的远程数据服务器通讯
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

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
    FormsModule,
    // +
    HttpClientModule,
    // forRoot() 配置方法接收一个 InMemoryDataService 类来初始化内存数据库
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
