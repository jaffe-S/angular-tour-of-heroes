import { Component, OnInit } from '@angular/core';
// 导入Hero类，组件的 hero 属性的类型重构为 Hero
import { Hero } from '../hero';
// 导入英雄列表
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // hero = 'Windstorm';

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  // 英雄列表
  heroes = HEROES;

  // 点击的ｌｉ值
  selectedHero: Hero;

  constructor() { }

  /*
   * 放置初始化逻辑
   */
  ngOnInit(): void {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
