import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BookItem} from '../data-models/BookItem';
import {DataAccessService} from '../data-access-services/data-access.service';
import {ActivatedRoute} from '@angular/router';

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

  arr = Array(2).fill(0).map((x, i) => i);

  constructor(private dataAccessService: DataAccessService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataAccessService.getBookItemsByParam('id', this.route.params['bookId'])
      .subscribe((response) => {
        const data = response.json();
        this.activeBookItemDetails = data;
        this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
          .subscribe((response2) => {
            console.log(response);
            const data2 = response2.json();
            this.bookItems = data2;
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
      });

    this.fullDescription = false;
    this.state = 'brief';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataAccessService.getBookItemsByParam('author', this.activeBookItemDetails.author)
      .subscribe((response) => {
        console.log(response);
        const data = response.json();
        this.bookItems = data;
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