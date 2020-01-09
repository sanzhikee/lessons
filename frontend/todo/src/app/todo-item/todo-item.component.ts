import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: any;
  @Output() delete = new EventEmitter<number>();
  @Output() complete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
