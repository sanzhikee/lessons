import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-todo-field',
  templateUrl: './todo-field.component.html',
  styleUrls: ['./todo-field.component.css']
})
export class TodoFieldComponent implements OnInit {
  @Input() formFromParent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
