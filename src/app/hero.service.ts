import { Injectable } from '@angular/core';
// 导入
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// 使用 RxJS 的 of() 函数来模拟从服务器返回数据
import { Observable, of } from 'rxjs';

// 导入缓存服务
import { MessageService } from './message.service';

@Injectable({
  // 根注入器　将你的服务注册成为提供者
  providedIn: 'root'
})
export class HeroService {

  // Angular 将会在创建 HeroService 时把 MessageService 的单例注入到这个属性中
  constructor(private messageService: MessageService) { }

  // 返回模拟数据的英雄列表
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // // 返回服务器数据的英雄列表　　Observable：可观察者
  // getHeroes(): Observable<Hero[]> {

  //   // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组
  //   return of(HEROES);
  // }

  // // 返回服务器数据的英雄列表　　Observable：可观察者
  getHeroes(): Observable<Hero[]> {
    // 在获取到英雄数组时发送一条消息
    this.messageService.add('HeroService: fetched heroes');

    // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组
    return of(HEROES);
  }
}
