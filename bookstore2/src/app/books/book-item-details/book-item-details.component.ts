import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BookItem} from '../../data-models/BookItem';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataAccessService} from '../../data-access-services/data-access.service';

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

  @Input() activeBookItemDetails: BookItem;

  @Output() addToCart = new EventEmitter<number>();

  fullDescription: boolean;

  state: string;

  bookItems: BookItem[];

  constructor(private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    // this.activeBookItemDetails = new BookItem(0, '', '', '', '', '', 0, 0, 0, '', 0);
    // this.bookItems = [new BookItem(0, '', '', '', '', '', 0, 0, 0, '', 0)];
    this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
      .subscribe((response) => {
        console.log(response);
        const data = response.json();
        this.bookItems = data.bookItems;
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
    this.fullDescription = false;
    this.state = 'brief';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
      .subscribe((response) => {
        console.log(response);
        const data = response.json();
        this.bookItems = data.bookItems;
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
    this.fullDescription = false;
    this.state = 'brief';
  }

  onAddToCart(form: HTMLFormElement) {
    console.log(form);
    this.addToCart.emit(form.value.quantity);
  }

  setFullDescription() {
    this.fullDescription = !this.fullDescription;
  }

}
