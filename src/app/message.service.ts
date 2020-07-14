import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  /*
   * 该服务对外暴露了它的 messages 缓存，以及两个方法　add(); clear();
  */

  messages: string[] = [];

  // 往缓存中添加一条消息
  add(message: string) {
    this.messages.push(message);
  }

  // 用于清空缓存。
  clear() {
    this.messages = [];
  }
}
