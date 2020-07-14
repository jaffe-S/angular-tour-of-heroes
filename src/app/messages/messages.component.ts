import { Component, OnInit } from '@angular/core';
// 导入信息服务
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // public公共属性，因为你将会在模板中绑定到它
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  }

}
