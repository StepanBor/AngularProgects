import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BookItem} from '../data-models/BookItem';
import {Router} from '@angular/router';
import {DataAccessService} from '../data-access-services/data-access.service';

@Component({
  selector: 'app-book-item-small-card',
  templateUrl: './book-item-small-card.component.html',
  styleUrls: ['./book-item-small-card.component.css']
})
export class BookItemSmallCardComponent implements OnInit, OnChanges {

  @Input() activeBookItemDetails: BookItem;

  @Output() itemDetailsId = new EventEmitter<string>();

  constructor(private router: Router, private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    // this.activeBookItemDetails = this.dataAccessService.bookItems[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  onBookClick() {
    this.itemDetailsId.emit('' + this.activeBookItemDetails.id);
  }

}
