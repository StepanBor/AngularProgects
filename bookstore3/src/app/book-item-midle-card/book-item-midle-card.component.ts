import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookItem} from '../data-models/BookItem';
import {ActivatedRoute, Router} from '@angular/router';
import {DataAccessService} from '../data-access-services/data-access.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-book-item-midle-card',
  templateUrl: './book-item-midle-card.component.html',
  styleUrls: ['./book-item-midle-card.component.css']
})
export class BookItemMidleCardComponent implements OnInit {

  serverURL = environment.serverURL;

  @Input() activeBookItemDetails: BookItem;

  @Output() itemDetailsId = new EventEmitter<string>();

  @Input() shoppingCartNum: number;

  constructor(private router: Router, private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
  }

  bookDetails() {
    this.itemDetailsId.emit('' + this.activeBookItemDetails.id);
  }

  deleteFromCart() {
    this.dataAccessService.deleteFromCart(this.activeBookItemDetails);
  }

  getFromCart(): number | null {
    return this.dataAccessService.getFromCart(this.activeBookItemDetails);
  }
}
