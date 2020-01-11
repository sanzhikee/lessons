import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import {TodoService} from "../service/todo.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ItemEventData} from "tns-core-modules/ui/list-view";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
    todoArray: Array<Item>;
    pagesAmount = 1;
    unsub$ = new Subject();

    constructor(private http: HttpClient, private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todoService.getTasks(this.pagesAmount)
            .pipe(takeUntil(this.unsub$))
            .subscribe((data: any) => {
                if (data.data) {
                    this.todoArray = data.data;
                    console.log(this.todoArray);
                    if (data.pagesAmount == 1) {
                        this.pagesAmount = 0;
                    } else {
                        this.pagesAmount = data.pagesAmount;
                    }
                }
            });
    }

    onTodoTap(todo): void {
        this.todoService.update(todo.id, todo.title, todo.is_completed)
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

    onLoadMoreTodos(args: ItemEventData) {
        console.log(args);
        this.pagesAmount++;
        this.getTasks();
    }
}
