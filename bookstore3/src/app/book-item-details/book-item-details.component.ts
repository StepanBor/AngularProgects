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
export class BookItemDetailsComponent implements OnInit, OnChanges {

  @Input() activeBookItemDetails: BookItem = new BookItem(null, null, null,
    null, null, null, null, null, null, null, null);

  @Output() addToCart = new EventEmitter<number>();

  @Input() showSameCat = true;

  fullDescription: boolean;

  state: string;

  bookItems: BookItem[];

  sameCategoryBooks: BookItem[];

  routerId: string = this.route.snapshot.params['bookId'];

  arr: number[];

  orderQuantity: number;

  constructor(private dataAccessService: DataAccessService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.showSameCat = true;
    if (this.routerId != null) {
      this.dataAccessService.getBookItemsByParam('id', this.routerId)
        .subscribe((response) => {
          const data = response.json();
          this.activeBookItemDetails = data.bookItems[0];
          this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
            .subscribe((response2) => {
              // console.log(response);
              const data2 = response2.json();
              this.bookItems = data2.bookItems;
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
              // console.log(response);
              const data2 = response2.json();
              this.sameCategoryBooks = data2.bookItems;
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
    }

    this.fullDescription = false;
    this.state = 'brief';
    this.orderQuantity = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {


  }


  onAddToCart(form: HTMLFormElement) {
    this.addToCart.emit(form.value.quantity);

    this.dataAccessService.addToCart(this.activeBookItemDetails, form.value.quantity);

    // console.log(this.dataAccessService.shoppingCart);
  }

  getFromCart(bookItem: BookItem): number {
    return this.dataAccessService.getFromCart(bookItem);
  }


  changeActiveItem(bookItemId: string) {
    this.dataAccessService.getBookItemsByParam('id', bookItemId)
      .subscribe((response) => {
        const data = response.json();
        this.activeBookItemDetails = data.bookItems[0];
        this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
          .subscribe((response2) => {
            // console.log(response);
            const data2 = response2.json();
            this.bookItems = data2.bookItems;
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
            // console.log(response);
            const data2 = response2.json();
            this.sameCategoryBooks = data2.bookItems;
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
