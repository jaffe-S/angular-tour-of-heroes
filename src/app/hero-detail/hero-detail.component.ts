import { Component, OnInit, Input } from '@angular/core';
// 声明类型
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;


  // 保存着到这个 HeroDetailComponent 实例的路由信息。
  // 这个组件对从 URL 中提取的路由参数感兴趣。
  // 其中的 id 参数就是要显示的英雄的 id
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // 从路由参数中提取 id
    // JavaScript 的 (+) 操作符会把字符串转换成数字
    // route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后
    // paramMap 是一个从 URL 中提取的路由参数值的字典, "id" 对应的值就是要获取的英雄的 id
    const id = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(){
    // 利用注入的 Location 服务,在浏览器的历史栈中后退一步
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
