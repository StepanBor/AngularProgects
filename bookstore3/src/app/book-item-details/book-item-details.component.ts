import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BookItem} from '../data-models/BookItem';
import {DataAccessService} from '../data-access-services/data-access.service';
import {ActivatedRoute} from '@angular/router';
import {ItemEntry} from '../data-models/ItemEntry';

@Component({
  selector: 'app-book-item-details',
  templateUrl: './book-item-details.component.html',
  styleUrls: ['./book-item-details.component.css'],
  animations: [
    trigger('descript', [
      state('brief', style({
        height: '75px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis'
      })),
      state('full', style({})),
      transition('brief <=> full', animate(500)),
    ])
  ]
})
export class BookItemDetailsComponent implements OnInit {

  @Input() activeBookItemDetails: BookItem;

  @Output() addToCart = new EventEmitter<number>();

  fullDescription: boolean;

  state: string;

  bookItems: BookItem[];

  sameCategoryBooks: BookItem[];

  routerId: string = this.route.snapshot.params['bookId'];

  arr: number[];

  orderQuantity: number;

  constructor(private dataAccessService: DataAccessService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataAccessService.getBookItemsByParam('id', this.routerId)
      .subscribe((response) => {
        const data: BookItem[] = response.json();
        this.activeBookItemDetails = data[0];
        this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
          .subscribe((response2) => {
            // console.log(response);
            const data2 = response2.json();
            this.bookItems = data2;
            if (this.bookItems.length < 2) {
              this.arr = Array(this.bookItems.length).fill(0).map((x, i) => i);
            } else {
              this.arr = Array(2).fill(0).map((x, i) => i);
            }
            this.bookItems.sort((a: BookItem, b: BookItem) => {
              if (a.rating > b.rating) {
                return -1;
              } else if (a.rating < b.rating) {
                return 1;
              } else {
                return 0;
              }
            });
          });
        this.dataAccessService.getBookItemsByParam('category', this.activeBookItemDetails.category)
          .subscribe((response2) => {
            console.log(response);
            const data2 = response2.json();
            this.sameCategoryBooks = data2;
            this.sameCategoryBooks.sort((a: BookItem, b: BookItem) => {
              if (a.rating > b.rating) {
                return -1;
              } else if (a.rating < b.rating) {
                return 1;
              } else {
                return 0;
              }
            });
          });
      });

    this.fullDescription = false;
    this.state = 'brief';
    this.orderQuantity = 1;
  }


  onAddToCart(form: HTMLFormElement) {
    this.addToCart.emit(form.value.quantity);
    let num = 0;
    for (const itemEntry of this.dataAccessService.shoppingCart) {
      if (itemEntry.key.id === this.activeBookItemDetails.id) {
        itemEntry.value = itemEntry.value + form.value.quantity;
        num = 1;
        break;
      }
    }
    if (num === 0) {
      this.dataAccessService.shoppingCart.push(new ItemEntry(this.activeBookItemDetails, form.value.quantity));
    }

    console.log(this.dataAccessService.shoppingCart);
  }


  changeActiveItem(bookItemId: string) {
    this.dataAccessService.getBookItemsByParam('id', bookItemId)
      .subscribe((response) => {
        const data: BookItem[] = response.json();
        this.activeBookItemDetails = data[0];
        this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
          .subscribe((response2) => {
            // console.log(response);
            const data2 = response2.json();
            this.bookItems = data2;
            if (this.bookItems.length < 2) {
              this.arr = Array(this.bookItems.length).fill(0).map((x, i) => i);
            } else {
              this.arr = Array(2).fill(0).map((x, i) => i);
            }
            this.bookItems.sort((a: BookItem, b: BookItem) => {
              if (a.rating > b.rating) {
                return -1;
              } else if (a.rating < b.rating) {
                return 1;
              } else {
                return 0;
              }
            });
          });
        this.dataAccessService.getBookItemsByParam('category', this.activeBookItemDetails.category)
          .subscribe((response2) => {
            console.log(response);
            const data2 = response2.json();
            this.sameCategoryBooks = data2;
            this.sameCategoryBooks.sort((a: BookItem, b: BookItem) => {
              if (a.rating > b.rating) {
                return -1;
              } else if (a.rating < b.rating) {
                return 1;
              } else {
                return 0;
              }
            });
          });
      });

    this.fullDescription = false;
    this.state = 'brief';
    this.orderQuantity = 1;
  }
}
