import {Component, OnInit} from '@angular/core';
import {DataAccessService} from '../data-access-services/data-access.service';
import {Subscription} from 'rxjs';
import {Chart} from 'chart.js';

import {Order} from '../data-models/Order';
import {Task1} from '../data-models/Task1';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {BookItem} from '../data-models/BookItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dateToday = new Date();
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
  newTasks: Task1[];

  orders: Order[];
  bookItems: BookItem[];
  chart = [];

  activeCarrency: string;
  USDUAH: number;
  EURUAH: number;
  RUBUAH: number;

  subscriptionUnProcessedOrders: Subscription;
  subscriptionBookItems: Subscription;
  subscriptionUSDUAH: Subscription;
  subscriptionEURUAH: Subscription;
  subscriptionRUBUAH: Subscription;


  constructor(private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    this.subscriptionUnProcessedOrders = this.dataAccessService
      .totalUnProcessedOrdersChanged.subscribe((count: number) => {
        this.unProcessedOrders = count;
      });
    this.subscriptionBookItems = this.dataAccessService
      .bookItemsChanged.subscribe((bookItems: BookItem[]) => {
        this.bookItems = bookItems;
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

    this.dataAccessService.getUnprocessedOrdersCount();
    this.dataAccessService.getRates();
    this.taskCount = 10;
    this.newClientsCount = 10;
    this.activeCarrency = 'USD';
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
        this.totalIncome = this.totalIncome + dayIcomeTemp;

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
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.datesWithOrders,
          datasets: [
            {
              data: this.totalIncomePerDay,
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
                labelString: 'Total income USD'
              }
            }]
          }
        }
      });
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
    } else if (scaleName === 'ordersPerDay') {
      dataY = this.ordersPerDay;
      scaleLabel = 'Orders quantity';
      dataX = this.datesWithOrders;
    } else {
      dataY = this.totalIncomePerDay;
      scaleLabel = 'Total income USD';
      dataX = this.datesWithOrders;
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

  changeActiveCurrency() {
    if (this.activeCarrency === 'USD') {
      this.activeCarrency = 'EUR';
    } else if (this.activeCarrency === 'EUR') {
      this.activeCarrency = 'RUB';
    } else {
      this.activeCarrency = 'USD';
    }
  }

}
