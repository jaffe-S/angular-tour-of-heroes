import { Injectable } from '@angular/core';
// 导入
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// 使用 RxJS 的 of() 函数来模拟从服务器返回数据
import { Observable, of } from 'rxjs';

@Injectable({
  // 根注入器　将你的服务注册成为提供者
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

 // 返回模拟数据的英雄列表
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // 返回服务器数据的英雄列表　　Observable：可观察者
  getHeroes(): Observable<Hero[]> {

    // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组
    return of(HEROES);
  }
}
