import {BookItem} from './BookItem';
import {User} from './User';
import {OnInit} from '@angular/core';


export class Order implements OnInit {

  private _id: number;

  private _orderList: [BookItem];

  private _orderPrice: number;

  private _client: User;

  private _shipment: number;

  private _status: string;

  private _orderDate: Date;

  constructor(id: number, orderList: [BookItem], orderPrice: number,
              client: User, shipmentId: number, status: string, orderDate: Date) {
    this._id = id;
    this._orderList = orderList;
    this._orderPrice = orderPrice;
    this._client = client;
    this._shipment = shipmentId;
    this._status = status;
    this._orderDate = orderDate;
  }

  ngOnInit(): void {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get orderList(): [BookItem] {
    return this._orderList;
  }

  set orderList(value: [BookItem]) {
    this._orderList = value;
  }

  get orderPrice(): number {
    return this._orderPrice;
  }

  set orderPrice(value: number) {
    this._orderPrice = value;
  }

  get client(): User {
    return this._client;
  }

  set client(value: User) {
    this._client = value;
  }

  get shipment(): number {
    return this._shipment;
  }

  set shipment(value: number) {
    this._shipment = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get orderDate(): Date {
    return this._orderDate;
  }

  set orderDate(value: Date) {
    this._orderDate = value;
  }
}
