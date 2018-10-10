import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Order} from '../data-models/Order';
import {DataAccessService} from '../data-access-services/data-access.service';
import {forEach} from 'typescript-collections/dist/lib/arrays';
import index from '@angular/cli/lib/cli';
import {HttpResponse} from '@angular/common/http';
import {NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';
import {CanComponentDeactivate} from '../can-deactivate-guard.service';
import {BookItem} from '../data-models/BookItem';
import {Shipment2} from '../data-models/Shipment2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, CanComponentDeactivate {

  orders: Order[] = [];
  totalOrderCount = 12;
  bookItems: BookItem[] = [];

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
  subscriptionBookItems: Subscription;

  isModalActive: boolean;
  isExitModalActive: boolean;
  isDeleteModalActive: boolean;
  newOrderId: number;

  @ViewChild('orderCreated') orderCreated;

  constructor(private orderService: DataAccessService,
              private router1: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {

    this.subscriptionOrders = this.orderService.ordersChanged.subscribe((ordersTemp: Order[]) => {
      this.orders = ordersTemp;
      this.activeOrder = ordersTemp[0];
    });

    this.subscriptionOrdersCount = this.orderService.totalOrderCountChanged.subscribe((count: number) => {
      this.totalOrderCount = count;
    });

    this.subscriptionBookItems = this.orderService.bookItemsChanged.subscribe((bookItemsTemp: BookItem[]) => {
      this.bookItems = bookItemsTemp;
      console.log(this.bookItems);
    });
    this.orderService.getBookItems('http://localhost:8080/bookItems');
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
    this.isExitModalActive = false;
    this.isDeleteModalActive = false;
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
    if (this.changedOrdersId.indexOf(id) === -1) {
      this.changedOrdersId.push(id);
    }
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
    console.log(this.changedOrdersId);
    console.log(this.changedOrdersId.indexOf(orderToSave.id));
    this.changedOrdersId.splice(this.changedOrdersId.indexOf(orderToSave.id), 1);
    console.log(this.changedOrdersId);
  }

  closeModal() {
    this.isModalActive = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changedOrdersId.length >= 2) {
      return confirm('Do you want discard changes?');
    }
    return true;
  }

  deleteOrder(orderToDelete: Order) {
    if (confirm('Delete bookItem' + orderToDelete.id)) {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id === orderToDelete.id) {
          this.orders.splice(i, 1);
          this.orderService.deleteOrder(orderToDelete).subscribe((response) => {
            console.log(response);
            if (response.status === 200) {
              this.isDeleteModalActive = true;
            }
          });
        }
      }
    }
  }

  saveAllChanges() {
    for (let i = 0; i < this.orders.length; i++) {
      for (let j = 0; j < this.changedOrdersId.length; j++) {
        if (this.orders[i].id === this.changedOrdersId[j]) {
          this.onSaveOrder(this.orders[i]);
        }
      }
    }
  }

  addNewOrder() {

    this.orderService.createNewOrder().subscribe((response) => {

      if (response.status === 200) {
        const num: number = response.json();
        this.newOrderId = num;
        this.openAddOrderModal(this.orderCreated);
      }
    });
  }

  openAddOrderModal(orderCreated) {
    this.modalService.open(orderCreated, {size: 'sm'});
  }

}
