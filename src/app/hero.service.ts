import { Injectable } from '@angular/core';
// 导入
import { Hero } from './hero';

// 服务器请求：数据来源
// import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// 使用 RxJS 的 of() 函数来模拟从服务器返回数据
import { Observable, of } from 'rxjs';
// 错误处理catchError
import { catchError, map, tap } from 'rxjs/operators';


// 导入缓存服务
import { MessageService } from './message.service';


@Injectable({
  // 根注入器　将你的服务注册成为提供者
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  // (保存)定义头
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  // Angular 将会在创建 HeroService 时把 MessageService 的单例注入到这个属性中
  constructor(
    // 
    private http: HttpClient,
    // 
    private messageService: MessageService
  ) { }

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

    //// of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组
    // return of(HEROES);

    //把该方法转换成使用 HttpClient ; 把 of() 替换成 http.get()
    return this.http.get<Hero[]>(this.heroesUrl)
      //  pipe() 方法来扩展 Observable 的结果
      .pipe(
        // 查看 Observable 中的值；通过 log() 方法往页面底部发送一条消息
        tap(_ => this.log('fetched heroes')),
        // 捕获错误：catchError() 操作符用来建立对 Observable 结果的处理管道（pipe）
        //　catchError() 操作符会拦截失败的 Observable
        // handleError() 方法会报告这个错误，并返回一个无害的结果（安全值）
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


  // // 它接收 id 参数, ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id
  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    //  使用想获取的英雄的 id 构造了一个请求 URL
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      // 服务器应该使用单个英雄作为回应
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }



  // ２．后期添加
  /**
   * HttpClient.put() 方法接受三个参数：URL 地址、要修改的数据（这里就是修改后的英雄）、选项
   */
  // 保存: http.put()
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // POST()它期待服务器为这个新的英雄生成一个 id，然后把它通过 Observable<Hero> 返回给调用者
  // 添加
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // delete():不用像 put() 和 post() 中那样发送任何数据，但仍要发送 httpOptions
  // 删除
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // 搜索
  /*  当用户在搜索框中输入名字时，
  　　你会不断发送根据名字过滤英雄的 HTTP 请求。 
     你的目标是仅仅发出尽可能少的必要请求
  */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    // 唯一的不同点是 URL，它包含了一个由搜索词组成的查询字符串
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }





  // 通用化： handleError() 将会在很多 HeroService 的方法之间共享
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  // 因将频繁调用它，因它包裹进一个私有的 log 方法中。
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
