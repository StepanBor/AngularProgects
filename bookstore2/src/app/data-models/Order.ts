import {BookItem} from './BookItem';
import {User} from './User';
import {OnInit} from '@angular/core';
import {Shipment2} from './Shipment2';
import {Dictionary} from 'typescript-collections';


export class Order implements OnInit {

  private _id: number;

  // private _orderMap: [BookItem];

  // private orderMap: Dictionary<BookItem, number>;

  private _orderMap: Dictionary<BookItem, number>;

  private _orderPrice: number;

  private _client: User;

  private _shipment: Shipment2;

  private _status: string;

  private _orderDate: Date;

  constructor(orderMap: Dictionary<BookItem, number>, orderPrice: number,
              client: User, shipment: Shipment2, status: string, orderDate: Date) {
    this._orderMap = orderMap;
    this._orderPrice = orderPrice;
    this._client = client;
    this._shipment = shipment;
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

  get orderMap(): Dictionary<BookItem, number> {
    return this._orderMap;
  }

  set orderMap(value: Dictionary<BookItem, number>) {
    this._orderMap = value;
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

  get shipment(): Shipment2 {
    return this._shipment;
  }

  set shipment(value: Shipment2) {
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
