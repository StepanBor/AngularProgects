import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BookItem} from '../../data-models/BookItem';
import {DataAccessService} from '../../data-access-services/data-access.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-book-item-line',
  templateUrl: './book-item-line.component.html',
  styleUrls: ['./book-item-line.component.css']
})
export class BookItemLineComponent implements OnInit, OnChanges {

  serverURL = environment.serverURL;

  bookItems: BookItem[];

  sortBy: string;

  subscriptionTotalBookItemCount: Subscription;

  itemsPerPage: number;
  paginationArr: number[];
  currentPage: number;
  url: string;
  changeSortDirect: boolean;
  totalBookCount = 12;

  constructor(private dataAccessService: DataAccessService) {

  }

  ngOnInit() {
    this.subscriptionTotalBookItemCount = this.dataAccessService.totalBookItemCountChanged
      .subscribe((count: number) => {
        this.totalBookCount = count;
        this.paginationArr = Array((this.totalBookCount % this.itemsPerPage) === 0 ?
          Math.floor(this.totalBookCount / this.itemsPerPage) : Math.floor(this.totalBookCount / this.itemsPerPage) + 1)
          .fill(0).map((x, i) => i);
      });
    this.dataAccessService.getBookItems2(this.serverURL + 'bookItems?sortBy=rating&page=1&sortDirect=DESC')
      .subscribe((response) => {
        const data = response.json();
        this.bookItems = data;
      });
    this.dataAccessService.getTotalBookItemsCount();

    this.currentPage = 1;
    this.sortBy = 'id';
    this.changeSortDirect = false;
    this.url = this.serverURL + 'bookItems?sortBy=' + this.sortBy
      + '&changeSortDirect=' + true + '&page=' + this.currentPage;
    this.itemsPerPage = 6;

  }

  ngOnChanges(changes: SimpleChanges): void {

    // this.sortBookItems(this.sortBy);
  }


  sortBookItems(sortParam: string) {
    if (sortParam === 'category') {
      this.bookItems.sort((a: BookItem, b: BookItem) => {
        if (a.category > b.category) {
          return -1;
        } else if (a.category < b.category) {
          return 1;
        } else {
          if (a.rating > b.rating) {
            return -1;
          } else if (a.rating < b.rating) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    } else if (sortParam === 'author') {
      this.bookItems.sort((a: BookItem, b: BookItem) => {
        if (a.author > b.author) {
          return -1;
        } else if (a.author < b.author) {
          return 1;
        } else {
          if (a.rating > b.rating) {
            return -1;
          } else if (a.rating < b.rating) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    } else if (sortParam === 'publisher') {
      this.bookItems.sort((a: BookItem, b: BookItem) => {
        if (a.publisher > b.publisher) {
          return -1;
        } else if (a.publisher < b.publisher) {
          return 1;
        } else {
          if (a.rating > b.rating) {
            return -1;
          } else if (a.rating < b.rating) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    } else {
      this.bookItems.sort((a: BookItem, b: BookItem) => {
        if (a.rating > b.rating) {
          return -1;
        } else if (a.rating < b.rating) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }


}
