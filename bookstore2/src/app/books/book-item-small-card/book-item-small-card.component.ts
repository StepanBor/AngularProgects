import {Component, Input, OnInit} from '@angular/core';
import {BookItem} from '../../data-models/BookItem';

@Component({
  selector: 'app-book-item-small-card',
  templateUrl: './book-item-small-card.component.html',
  styleUrls: ['./book-item-small-card.component.css']
})
export class BookItemSmallCardComponent implements OnInit {

  @Input() activeBookItemDetails: BookItem;

  constructor() { }

  ngOnInit() {
  }

}
