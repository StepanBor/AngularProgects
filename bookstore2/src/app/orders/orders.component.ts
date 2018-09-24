import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Order} from '../data-models/Order';
import {UserDataAccessService} from '../data-access-services/user.data-access.service';
import {forEach} from 'typescript-collections/dist/lib/arrays';
import index from '@angular/cli/lib/cli';
import {HttpResponse} from '@angular/common/http';

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
  changedOrdersId: number[] = [-1];

  subscriptionOrders: Subscription;
  subscriptionOrdersCount: Subscription;

  isModalActive: boolean;

  constructor(private orderService: UserDataAccessService) {
  }

  ngOnInit() {
    this.subscriptionOrders = this.orderService.ordersChanged.subscribe((ordersTemp: Order[]) => {
      this.orders = ordersTemp;
      this.activeOrder = ordersTemp[0];
    });

    this.subscriptionOrdersCount = this.orderService.totalOrderCountChanged.subscribe((count: number) => {
      this.totalOrderCount = count;
    });

    this.orderService.getOrders('http://localhost:8080/orders');
    this.orderService.getTotalOrderCount();
    // this.activeOrder = this.orders[0];
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

    this.isModalActive = false;
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

  setActiveRow(index1: number, orderId: number) {
    this.activeRow = index1;
    this.activeOrderId = orderId;
    for (const order of this.orders) {
      if (order.id === orderId) {
        this.activeOrder = order;
        console.log(this.activeOrder.orderList[0]);
      }
    }
  }

  setChangedOrderId(id: number) {
    this.changedOrdersId.push(id);
  }

  isOrderChanged(id: number): boolean {

    for (const num of this.changedOrdersId) {
      if (num === id) {
        return true;
      }
    }
    return false;
  }

  onSaveOrder(orderToSave: Order) {
    this.orderService.saveOrder(orderToSave).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        this.isModalActive = true;
      }
    });
    this.changedOrdersId.splice(this.changedOrdersId.indexOf(orderToSave.id), 1);
  }

  closeModal() {
    this.isModalActive = false;
  }
}
