import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Order} from '../../data-models/Order';
import {UserDataAccessService} from '../../data-access-services/user.data-access.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges {

  @Input() activeOrder: Order;

  iteratArray: number[];

  activeRowOrderTable: number;

  itemsPerPage: number;
  paginationArr: number[];

  activeTabNum: number;

  constructor(private orderService: UserDataAccessService) {
  }

  ngOnInit() {

    this.activeRowOrderTable = -1;
    this.iteratArray = Array(this.activeOrder.orderList.length * 2).fill(0).map((x, i) => i);

    this.itemsPerPage = 6;
    this.paginationArr = Array((this.activeOrder.orderList.length % this.itemsPerPage) === 0 ?
      Math.floor(this.activeOrder.orderList.length % this.itemsPerPage) : Math.floor(this.activeOrder.orderList.length % this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
    this.activeTabNum = 0;

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.iteratArray = Array(this.activeOrder.orderList.length * 2).fill(0).map((x, i) => i);

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

}
