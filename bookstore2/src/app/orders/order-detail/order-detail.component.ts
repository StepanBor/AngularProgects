import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Order} from '../../data-models/Order';
import {UserDataAccessService} from '../../data-access-services/user.data-access.service';
import {ItemEntry} from '../../data-models/ItemEntry';
import {CanComponentDeactivate} from '../../can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges{

  @Input() activeOrder: Order;

  iteratArray: number[];

  activeRowOrderTable: number;

  itemsPerPage: number;

  paginationArr: number[];

  activeTabNum: number;

  isModalActive: boolean;

  itemToRemove: ItemEntry;

  isActiveOrderChanged: boolean;

  @Output() orderChanged = new EventEmitter<number>();

  constructor(private orderService: UserDataAccessService) {
  }

  ngOnInit() {

    this.activeRowOrderTable = -1;
    this.iteratArray = Array(this.activeOrder.orderList.length * 2).fill(0).map((x, i) => i);
    this.isModalActive = false;
    this.itemsPerPage = 6;
    this.isActiveOrderChanged = false;
    this.paginationArr = Array((this.activeOrder.orderList.length % this.itemsPerPage) === 0
      ? Math.floor(this.activeOrder.orderList.length % this.itemsPerPage)
      : Math.floor(this.activeOrder.orderList.length % this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
    this.activeTabNum = 0;
    console.log(this.activeOrder.orderList + 'HHHHHHHHHHHHHHHHH');
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.iteratArray = Array(this.activeOrder.orderList.length * 2).fill(0).map((x, i) => i);
    this.activeTabNum = 0;

  }

  setActiveRowOrderTable(rowIndex: number) {
    if (this.activeRowOrderTable === rowIndex) {
      this.activeRowOrderTable = -1;
    } else {
      this.activeRowOrderTable = rowIndex;
    }
  }

  setActiveTabNum(tabNum: number) {
    this.activeTabNum = tabNum;
  }

  setItemEntryValue(value: number, itemEntry: ItemEntry) {
    this.activeOrder.orderPrice = this.activeOrder.orderPrice - itemEntry.value * itemEntry.key.price;
    if (value <= 0) {
      this.itemToRemove = itemEntry;
      this.isModalActive = true;
      itemEntry.value = 0;
    } else {
      itemEntry.value = value;
      this.isModalActive = false;
    }
    this.activeOrder.orderPrice = this.activeOrder.orderPrice + itemEntry.value * itemEntry.key.price;
    this.orderChanged.emit(this.activeOrder.id);
  }

  removeOrderListItem(itemEntry: ItemEntry) {
    for (let i = 0; i < this.activeOrder.orderList.length; i++) {
      if (this.activeOrder.orderList[i].key.id === itemEntry.key.id) {
        this.activeOrder.orderList.splice(i, 1);
        // this.activeOrder.orderPrice = this.activeOrder.orderPrice - itemEntry.key.price;
      }
      this.isModalActive = false;
    }
    this.orderChanged.emit(this.activeOrder.id);
  }


}
