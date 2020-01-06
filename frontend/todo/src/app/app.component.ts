import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
    todoArray:any = [];
    todo;
    idCounter = 0;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get('http://api.lesson.lcl:88/todo/index?page=1&size=5', {}).subscribe(data => {
            this.todoArray = data.data;
        });
    }


    addTodo(value) {
        if (value !== "") {
            const object = {title: value, is_completed: false, id: this.idCounter++};
            this.todoArray.push(object)
        } else {
            alert('Field required **')
        }

    }

    /*delete item*/
    deleteItem(id) {
        for (let i = 0; i <= this.todoArray.length; i++) {
            if (id == this.todoArray[i].id) {
                this.todoArray.splice(i, 1)
            }
        }
    }

    /*delete item*/
    completeItem(id) {
        for (let i = 0; i <= this.todoArray.length; i++) {
            if (id == this.todoArray[i].id) {
                this.todoArray[i].is_completed = true;
            }
        }
    }

    // submit Form
    todoSubmit(value: any) {
        if (value !== "") {
            const object = {title: value, is_completed: false, id: this.idCounter++};
            this.todoArray.push(value.todo)
            //this.todoForm.reset()
        } else {
            alert('Field required **')
        }

    }

}
