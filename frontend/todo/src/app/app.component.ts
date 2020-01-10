import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodoService} from "./service/todo.service";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";
import {pipe, Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

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
    form: FormGroup;

    constructor(private http: HttpClient, private todoService: TodoService) {
        this.form = new FormGroup({
            inputControl: new FormControl(''),
            id: new FormControl(''),
            state: new FormControl('')
        });
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


    addTodo() {
        const value = this.form.value.inputControl;
        if (value !== "") {
            this.todoService.todoCreate({ title: value })
                .pipe(takeUntil(this.unsub$))
                .subscribe(update => {
                    this.todoService.todoPages(this.pagesAmount)
                        .pipe(takeUntil(this.unsub$))
                        .subscribe((data: any) => {
                            if (data.data) {
                                this.todoArray = data.data;
                                this.pagesAmount = data.pagesAmount;
                            }
                            this.form.reset();
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

    pageChange(page: number) {
        this.pagesAmount = page;
        this.getTasks();
    }

    ngOnDestroy() {
        this.unsub$.next(true);
        this.unsub$.unsubscribe();
        // this.unsub$.complete();
    }
}
