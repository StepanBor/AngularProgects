import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataAccessService} from '../data-access-services/data-access.service';
import {Observable, Subscription} from 'rxjs';
import {Chart} from 'chart.js';

import {Order} from '../data-models/Order';
import {Task1} from '../data-models/Task1';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {BookItem} from '../data-models/BookItem';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Response} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class HomeComponent implements OnInit {

  title = 'bookstore2';
  isSidebarOn = false;

  dateToday = new Date();
  incomeReportDate = new Date();
  unProcessedOrders: number;
  taskCount: number;
  newClientsCount: number;
  totalIncome = 0;
  orderDates: Date[] = [];
  orderSum: number[] = [];
  totalIncomePerDay: number[] = [];
  dayIncome: number[] = [];
  ordersPerDay: number[] = [];
  datesWithOrders: Date[] = [];
  // dateIncome: { day: number, month: number, year: number };
  dateIncome: Date;

  newTasks: Task1[];

  orders: Order[];
  bookItems: BookItem[];
  bookItemsRating: number[] = [];
  bookItemIncome: number[] = [];
  bookItemsNames: string[] = [];
  itemsInBarChart = 6;
  chartScaleName = '';
  barChartScaleName = '';
  chart = [];
  barChart = [];

  activeCarrency: string;
  USDUAH: number;
  EURUAH: number;
  RUBUAH: number;

  subscriptionUnProcessedOrders: Subscription;
  subscriptionBookItems: Subscription;
  subscriptionUSDUAH: Subscription;
  subscriptionEURUAH: Subscription;
  subscriptionRUBUAH: Subscription;

  isPopularItemCollapsed: boolean;
  isTasksCollapsed: boolean;
  isItemReportCollapsed: boolean;
  isIncomeReportCollapsed: boolean;

  constructor(private dataAccessService: DataAccessService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.subscriptionUnProcessedOrders = this.dataAccessService
      .totalUnProcessedOrdersChanged.subscribe((count: number) => {
        this.unProcessedOrders = count;
      });
    this.subscriptionBookItems = this.dataAccessService
      .bookItemsChanged.subscribe((bookItems1: BookItem[]) => {
        this.bookItems = bookItems1;
        this.bookItems.sort((a: BookItem, b: BookItem) => {
          if (a.rating > b.rating) {
            return -1;
          } else if (a.rating < b.rating) {
            return 1;
          } else {
            return 0;
          }
        });
        this.bookItemsRating.splice(0);
        this.bookItemsNames.splice(0);
        for (let i = 0; i < this.itemsInBarChart; i++) {
          this.bookItemsRating.push(this.bookItems[i].rating);
          this.bookItemsNames.push(this.bookItems[i].bookName);
          this.bookItemIncome.push(this.bookItems[i].rating * this.bookItems[i].price);
        }
        this.changeBarChartYScale('');
      });
    this.subscriptionUSDUAH = this.dataAccessService.USDUAH.subscribe((num: number) => {
      this.USDUAH = num;
    });
    this.subscriptionEURUAH = this.dataAccessService.EURUAH.subscribe((num: number) => {
      this.EURUAH = num;
    });
    this.subscriptionRUBUAH = this.dataAccessService.RUBUAH.subscribe((num: number) => {
      this.RUBUAH = num;
    });

    this.isPopularItemCollapsed = true;
    this.isTasksCollapsed = true;
    this.isItemReportCollapsed = false;
    this.isIncomeReportCollapsed = false;
    // this.incomeReportDate = new Date();
    this.dataAccessService.getUnprocessedOrdersCount();
    this.dataAccessService.getRates();
    this.taskCount = 10;
    this.newClientsCount = 10;
    this.activeCarrency = 'USD';
    this.dataAccessService.getBookItems('http://localhost:8080/bookItems');
    this.dataAccessService.getTasks().subscribe((responce) => {
      this.newTasks = responce.json();
    });

    this.dataAccessService.getAllOrders().subscribe((response) => {
      const data: Order[] = response.json();
      this.orders = data;
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i].orderDate);
        // this.totalIncome = this.totalIncome + data[i].orderPrice;
        this.orderDates.push(data[i].orderDate);
        if (!(this.datesWithOrders.indexOf(data[i].orderDate) >= 0)) {
          this.datesWithOrders.push(data[i].orderDate);
        }
      }
      this.orderDates.sort();
      this.datesWithOrders.sort();
      this.orders.sort((a: Order, b: Order) => {
        if (a.orderDate > b.orderDate) {
          return 1;
        } else if (a.orderDate === b.orderDate) {
          return 0;
        } else {
          return -1;
        }
      });

      for (let i = 0; i < this.datesWithOrders.length; i++) {
        let dayIcomeTemp = 0;
        for (let j = 0; j < this.orders.length; j++) {
          if (this.datesWithOrders[i] === this.orders[j].orderDate) {
            dayIcomeTemp = dayIcomeTemp + this.orders[j].orderPrice;
          }
        }
        this.totalIncome = Math.floor(this.totalIncome + dayIcomeTemp);

        this.totalIncomePerDay.push(this.totalIncome);

        this.orderSum.push(this.orders[i].orderPrice);
      }
      let date: Date;
      for (const orderDate of this.datesWithOrders) {
        let count = 0;
        let count2 = 0;
        for (let i = 0; i < this.orders.length; i++) {
          if (orderDate === this.orders[i].orderDate) {
            count = count + this.orders[i].orderPrice;
            count2++;
          }
        }
        if (orderDate !== date) {
          this.dayIncome.push(count);
          this.ordersPerDay.push(count2);
        }
        date = orderDate;
      }
      this.changeChartYScale('');
    });
    // this.dataAccessService.getRates().subscribe((response) => {
    //   console.log(response);
    // });
  }


  changeChartYScale(scaleName: String) {

    let dataX = [];
    let dataY = [];
    let scaleLabel: string;
    if (scaleName === 'dayIncome') {
      dataY = this.dayIncome;
      scaleLabel = 'Day income USD';
      dataX = this.datesWithOrders;
      this.chartScaleName = 'day income';
    } else if (scaleName === 'ordersPerDay') {
      dataY = this.ordersPerDay;
      scaleLabel = 'Orders quantity';
      dataX = this.datesWithOrders;
      this.chartScaleName = 'orders in day';
    } else {
      dataY = this.totalIncomePerDay;
      scaleLabel = 'Total income USD';
      dataX = this.datesWithOrders;
      this.chartScaleName = 'total income';
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: dataX,
        datasets: [
          {
            data: dataY,
            borderColor: '#3cba9f',
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: scaleLabel
            }
          }]
        }
      }
    });
  }

  changeBarChartYScale(scaleName: string) {
    let dataX = [];
    let dataY = [];
    let scaleLabel: string;
    if (scaleName === 'copiesSold') {
      dataX = this.bookItemsNames;
      dataY = this.bookItemsRating;
      scaleLabel = 'copies sold';
      this.barChartScaleName = scaleName;
    } else {
      dataX = this.bookItemsNames;
      dataY = this.bookItemIncome;
      scaleLabel = 'item income USD';
      this.barChartScaleName = 'item income';
    }
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: dataX,
        datasets: [
          {
            data: dataY,
            borderColor: '#3cba9f',
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            fill: true
          }
        ],
        borderWidth: 5
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: scaleLabel
            }
          }]
        }
      }
    });
  }

  changeActiveCurrency() {
    if (this.activeCarrency === 'USD') {
      this.activeCarrency = 'EUR';
    } else if (this.activeCarrency === 'EUR') {
      this.activeCarrency = 'RUB';
    } else {
      this.activeCarrency = 'USD';
    }
  }

  openPickDateModal(modal) {
    this.modalService.open(modal);
  }

  onDateSubmit() {
    this.modalService.dismissAll();

    // date.setFullYear(this.dateIncome.year, this.dateIncome.month, this.dateIncome.day);
    console.log(this.dateIncome.getTime());
    console.log(new Date(this.datesWithOrders[1]).getTime());
    for (let i = 0; i < this.datesWithOrders.length; i++) {
      const date = new Date(this.datesWithOrders[i]);
      if (this.dateIncome.getTime() >= date.getTime()) {
        this.incomeReportDate = this.datesWithOrders[i];
        this.totalIncome = Math.floor(this.totalIncomePerDay[i]);
      }
    }
  }

  deleteTasks(task: Task1) {
    this.dataAccessService.deleteTasks(task).subscribe((responce) => {
      this.newTasks = responce.json();
    });
  }

  onSidebarOn() {
    this.isSidebarOn = !this.isSidebarOn;
  }
}
