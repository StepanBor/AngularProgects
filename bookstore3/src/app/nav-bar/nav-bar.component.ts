import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataAccessService} from '../data-access-services/data-access.service';
import {BookItem} from '../data-models/BookItem';
import {ItemEntry} from '../data-models/ItemEntry';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() sideBarTogle = new EventEmitter<boolean>();
  shoppingCart: ItemEntry[];

  constructor(private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    this.shoppingCart = this.dataAccessService.shoppingCart;
  }

}
