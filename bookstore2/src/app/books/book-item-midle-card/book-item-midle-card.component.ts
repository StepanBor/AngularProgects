import {Component, Input, OnInit} from '@angular/core';
import {BookItem} from '../../data-models/BookItem';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-book-item-midle-card',
  templateUrl: './book-item-midle-card.component.html',
  styleUrls: ['./book-item-midle-card.component.css']
})
export class BookItemMidleCardComponent implements OnInit {

  serverURL = environment.serverURL;

  @Input() activeBookItemDetails: BookItem;

  constructor() { }

  ngOnInit() {
  }

}
