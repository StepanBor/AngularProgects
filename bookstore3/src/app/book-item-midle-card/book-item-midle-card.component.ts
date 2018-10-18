import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookItem} from '../data-models/BookItem';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-book-item-midle-card',
  templateUrl: './book-item-midle-card.component.html',
  styleUrls: ['./book-item-midle-card.component.css']
})
export class BookItemMidleCardComponent implements OnInit {

  @Input() activeBookItemDetails: BookItem;

  @Output() itemDetailsId = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  bookDetails() {
    this.itemDetailsId.emit('' + this.activeBookItemDetails.id);
  }

}
