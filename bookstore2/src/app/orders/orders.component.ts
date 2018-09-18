import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Order} from '../data-models/Order';
import {UserDataAccessService} from '../data-access-services/user.data-access.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  totalOrderCount = 12;

  itemsPerPage: number;
  paginationArr: number[];
  currentPage: number;
  sortBy: string;
  url: string;
  changeSortDirect: boolean;
  activeRow: number;
  activeOrderId: number;
  activeOrder: Order;

  subscriptionOrders: Subscription;
  subscriptionOrdersCount: Subscription;

  constructor(private orderService: UserDataAccessService) {
  }

  ngOnInit() {
    this.subscriptionOrders = this.orderService.ordersChanged.subscribe((ordersTemp: Order[]) => {
      this.orders = ordersTemp;

    });

    this.subscriptionOrdersCount = this.orderService.totalOrderCountChanged.subscribe((count: number) => {
      this.totalOrderCount = count;
    });

    this.orderService.getOrders('http://localhost:8080/orders');
    this.orderService.getTotalOrderCount();
    this.activeOrder = this.orders[0];
    this.itemsPerPage = 6;
    this.paginationArr = Array((this.totalOrderCount % this.itemsPerPage) === 0 ?
      Math.floor(this.totalOrderCount / this.itemsPerPage) : Math.floor(this.totalOrderCount / this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
    this.currentPage = 1;
    this.sortBy = 'id';
    this.changeSortDirect = false;
    this.activeRow = -1;
    this.activeOrderId = 0;
    this.url = 'http://localhost:8080/orders?sortBy=' + this.sortBy
      + '&changeSortDirect=' + true + '&page=' + this.currentPage;

  }

  onSortGet(sortBy: string, changeSortDirect: boolean, page: number) {
    this.sortBy = sortBy;
    this.currentPage = page;
    this.url = 'http://localhost:8080/orders?sortBy=' + this.sortBy
      + '&changeSortDirect=' + changeSortDirect + '&page=' + this.currentPage;
    this.orderService.getOrders(this.url);
    this.orderService.getTotalOrderCount();
    this.itemsPerPage = 6;
    this.paginationArr = Array((this.totalOrderCount % this.itemsPerPage) === 0 ?
      Math.floor(this.totalOrderCount / this.itemsPerPage) : Math.floor(this.totalOrderCount / this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
  }

  setActiveRow(index: number, orderId: number) {
    this.activeRow = index;
    this.activeOrderId = orderId;
    for (const order of this.orders) {
      if (order.id === orderId) {
        this.activeOrder = order;
        console.log(this.activeOrder.orderSet);
      }
    }
  }
}
