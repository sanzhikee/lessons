import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTasks(pagesAmount) {
    return this.http.get('http://api.lesson.lcl:88/todo/index?page=' + pagesAmount + '&size=5', {})
  }

  deleteTodo(id) {
    return this.http.post('http://api.lesson.lcl:88/todo/delete', {
      id
    })
  }

  create(title) {
    return this.http.post('http://api.lesson.lcl:88/todo/create', {
      title
    })
  }

  update(id, title, is_completed) {
    return this.http.post('http://api.lesson.lcl:88/todo/update', {
      id, title, is_completed: !is_completed
    });
  }

  todoCreate(body) {
    return this.http.post('http://api.lesson.lcl:88/todo/create', { ...body });
  }

  todoPages(pagesAmount) {
    return this.http.get('http://api.lesson.lcl:88/todo/index?page=' + pagesAmount + '&size=5', {});
  }
}
