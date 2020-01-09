import {EventEmitter, Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pageNum;
  @Output() pageChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  makeArray(pages){
    return new Array(pages);
  }
}
