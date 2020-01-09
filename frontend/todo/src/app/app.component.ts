import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
    todoArray: any = [];
    todo;
    pagesAmount = 1;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get('http://api.lesson.lcl:88/todo/index?page=' + this.pagesAmount + '&size=5', {}).subscribe((data:any) => {
            if (data.data) {
                this.todoArray = data.data;
                if (data.pagesAmount == 1) {
                    this.pagesAmount = 0;
                } else {
                    this.pagesAmount = data.pagesAmount;
                }
            }
        });
    }


    addTodo(value) {
        if (value !== "") {
            this.http.post('http://api.lesson.lcl:88/todo/create', {
                title: value
            }).subscribe(update => {
                this.http.get('http://api.lesson.lcl:88/todo/index?page=' + this.pagesAmount + '&size=5', {}).subscribe((data:any) => {
                    if (data.data) {
                        this.todoArray = data.data;
                        this.pagesAmount = data.pagesAmount;
                    }
                });
            });
        } else {
            alert('Field required **')
        }

    }

    /*delete item*/
    deleteItem(id) {
        for (let i = 0; i < this.todoArray.length; i++) {
            if (id === this.todoArray[i].id) {
                this.todo = this.todoArray[i];
            }
        }

        this.http.post('http://api.lesson.lcl:88/todo/delete', {
            id: this.todo.id
        }).subscribe(update => {
            this.http.get('http://api.lesson.lcl:88/todo/index?page=' + this.pagesAmount + '&size=5', {}).subscribe((data:any) => {
                if (data.data) {
                    this.todoArray = data.data;
                    this.pagesAmount = data.pagesAmount;
                }
            });
        });
    }

    /*delete item*/
    completeItemClick(id) {
        for (let i = 0; i < this.todoArray.length; i++) {
            if (id === this.todoArray[i].id) {
                this.todo = this.todoArray[i];
            }
        }

        this.http.post('http://api.lesson.lcl:88/todo/update', {
            id: this.todo.id, title: this.todo.title, is_completed: !this.todo.is_completed
        }).subscribe(update => {
            this.http.get('http://api.lesson.lcl:88/todo/index?page=' + this.pagesAmount + '&size=5', {}).subscribe((data:any) => {
                if (data.data) {
                    this.todoArray = data.data;
                    this.pagesAmount = data.pagesAmount;
                }
            });
        });
    }

    // submit Form
    todoSubmit(value: any) {
        if (value !== "") {
            this.http.post('http://api.lesson.lcl:88/todo/create', {
                title: value
            }).subscribe(update => {
                this.http.get('http://api.lesson.lcl:88/todo/index?page=' + this.pagesAmount + '&size=5', {}).subscribe((data:any) => {
                    if (data.data) {
                        this.todoArray = data.data;
                        this.pagesAmount = data.pagesAmount;
                    }
                });
            });
        } else {
            alert('Field required **')
        }

        return false;
    }

    pageChange(page: any) {
        this.pagesAmount = page;

        this.http.get('http://api.lesson.lcl:88/todo/index?page=' + this.pagesAmount + '&size=5', {}).subscribe((data:any) => {
            if (data.data) {
                this.todoArray = data.data;
                this.pagesAmount = data.pagesAmount;
            }
        });
    }

    makeArray(pagesAmout: any) {
        let array = [];
        for (let i = 1; i <= pagesAmout; i++) {
            array.push(i);
        }
        return array;
    }
}
