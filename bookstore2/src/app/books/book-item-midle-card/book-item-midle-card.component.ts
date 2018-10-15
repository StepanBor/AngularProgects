import {Component, Input, OnInit} from '@angular/core';
import {BookItem} from '../../data-models/BookItem';

@Component({
  selector: 'app-book-item-midle-card',
  templateUrl: './book-item-midle-card.component.html',
  styleUrls: ['./book-item-midle-card.component.css']
})
export class BookItemMidleCardComponent implements OnInit {

  @Input() activeBookItemDetails: BookItem;

  constructor() { }

  ngOnInit() {
  }

}
