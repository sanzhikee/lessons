import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTasks(pagesAmount) {
    return this.http.get('https://aa7ab2f0.ngrok.io/todo/index?page=' + pagesAmount + '&size=5', {})
  }

  deleteTodo(id) {
    return this.http.post('https://aa7ab2f0.ngrok.io/todo/delete', {
      id
    })
  }

  create(title) {
    return this.http.post('https://aa7ab2f0.ngrok.io/todo/create', {
      title
    })
  }

  update(id, title, is_completed) {
    return this.http.post('https://aa7ab2f0.ngrok.io/todo/update', {
      id, title, is_completed: !is_completed
    });
  }

  todoCreate(body) {
    return this.http.post('https://aa7ab2f0.ngrok.io/todo/create', { ...body });
  }

  todoPages(pagesAmount) {
    return this.http.get('https://aa7ab2f0.ngrok.io/todo/index?page=' + pagesAmount + '&size=5', {});
  }
}
