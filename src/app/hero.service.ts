import { Injectable } from '@angular/core';
// 导入
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  // 根注入器　将你的服务注册成为提供者
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  // 返回模拟的英雄列表
  getHeroes(): Hero[] {
    return HEROES;
  }
}
