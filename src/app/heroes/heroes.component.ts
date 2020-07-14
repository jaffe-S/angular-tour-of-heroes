import { Component, OnInit } from '@angular/core';
// 导入Hero类，组件的 hero 属性的类型重构为 Hero
import { Hero } from '../hero';
// // 导入英雄列表
// import { HEROES } from '../mock-heroes';
// 导入服务
import { HeroService } from '../hero.service';

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
  // // 英雄列表
  // heroes = HEROES;

  // 服务变量　声明
  heroes: Hero[];

  // 点击的ｌｉ值
  selectedHero: Hero;

  // 往构造函数中　添加服务heroService，其类型为HeroService
  constructor(
    private heroService: HeroService
  ) { }

  /*
   * 放置初始化逻辑
   */
  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  // // 获取这些英雄模拟数据
  //   getHeroes(): void {
  // //　(同步)
  //     this.heroes = this.heroService.getHeroes();
  //   }

  getHeroes(): void {
    // 等待 Observable 发出这个英雄数组，这可能立即发生，也可能会在几分钟之后。
    // 然后，subscribe() 方法把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性
    // (异步)
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
