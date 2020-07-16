import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  // heroes$ 声明为一个 Observable
  heroes$: Observable<Hero[]>;

  /**
   * searchTerms:
   * Subject 既是可观察对象的数据源，本身也是 Observable。
   * 你可以像订阅任何 Observable 一样订阅 Subject。
   * 
   */
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService
  ) { }

  search(term: string): void {
    // 调用searchTerms的 next(value) 方法往 Observable 中推送一些值，就像 search() 方法中一样
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 每当用户击键后就直接调用 searchHeroes() 将导致创建海量的 HTTP 请求
      // 在传出最终字符串之前，debounceTime(300) 将会等待，直到新增字符串的事件暂停了 300 毫秒
      debounceTime(300),
      // distinctUntilChanged() 会确保只在过滤条件变化时才发送请求
      distinctUntilChanged(),
      // switchMap() 会记住原始的请求顺序，只会返回最近一次 HTTP 方法调用的结果。 以前的那些请求都会被取消和舍弃。
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
