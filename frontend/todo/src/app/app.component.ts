import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodoService} from "./service/todo.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
    todoArray: any = [];
    todo;
    pagesAmount = 1;
    unsub$ = new Subject();

    constructor(private http: HttpClient, private todoService: TodoService) {
    }

    ngOnInit() {
        this.todoService.getTasks(this.pagesAmount)
            .pipe(takeUntil(this.unsub$))
            .subscribe((data: any) => {
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
            this.todoService.todoCreate({ title: value })
                .pipe(takeUntil(this.unsub$))
                .subscribe(update => {
                    this.todoService.todoPages(this.pagesAmount)
                        .pipe(takeUntil(this.unsub$))
                        .subscribe(data => {
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
        this.todoService.deleteTodo(id)
            .pipe(takeUntil(this.unsub$))
            .subscribe(update => {
                this.getTasks();
            });
    }

    getTasks() {
        this.todoService.getTasks(this.pagesAmount)
            .pipe(takeUntil(this.unsub$))
            .subscribe((data: any) => {
                if (data.data) {
                    this.todoArray = data.data;
                    this.pagesAmount = data.pagesAmount;
                }
            });
    }

    /*delete item*/
    completeItemClick(id) {
        const todo = this.todoArray.find( todo => todo.id === id ); // {id: 1}
        // const todo = this.todoArray.filter( todo => todo.id === id )[0]; // [{id: 1}]

        this.todoService.update(todo.id, todo.title, todo.is_completed)
            .pipe(takeUntil(this.unsub$))
            .subscribe(update => {
                this.getTasks();
            });
    }

    // submit Form
    todoSubmit(value: any) {
        if (value !== "") {
            this.todoService.create(value)
                .pipe(takeUntil(this.unsub$))
                .subscribe(update => {
                    this.getTasks();
                });
        } else {
            alert('Field required **')
        }

        return false;
    }

    pageChange(page: any) {
        this.pagesAmount = page;
        this.getTasks();
    }

    makeArray(pagesAmout: int) {
        // let array = [];
        // for (let i = 1; i <= pagesAmout; i++) {
        //     array.push(i);
        // }
        // return array;

        return new Array(pagesAmout);
    }

    ngOnDestroy() {
        this.unsub$.next(true);
        this.unsub$.unsubscribe();
        // this.unsub$.complete();
    }
}
