import {Component, Input, OnInit} from '@angular/core';
import {BookItem} from '../../data-models/BookItem';

@Component({
  selector: 'app-book-item-details',
  templateUrl: './book-item-details.component.html',
  styleUrls: ['./book-item-details.component.css']
})
export class BookItemDetailsComponent implements OnInit {

  @Input() activeBookItemDetails: BookItem;

  constructor() {
  }

  ngOnInit() {
  }

}
