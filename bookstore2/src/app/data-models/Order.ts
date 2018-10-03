import {BookItem} from './BookItem';
import {User} from './User';
import {OnInit} from '@angular/core';
import {Shipment2} from './Shipment2';
import {ItemEntry} from './ItemEntry';


export class Order {

  public id: number;

  // private _orderList: [BookItem];

  // private orderList: Dictionary<BookItem, number>;

  public orderList: ItemEntry[];

  public orderPrice: number;

  public client: User;

  public shipment: Shipment2;

  public status: string;

  public orderDate: Date;

  constructor(orderSet: ItemEntry[], orderPrice: number,
              client: User, shipment: Shipment2, status: string, orderDate: Date) {
    this.orderList = orderSet;
    this.orderPrice = orderPrice;
    this.client = client;
    this.shipment = shipment;
    this.status = status;
    this.orderDate = orderDate;
  }

  // getId(): number {
  //   return this.id;
  // }
  //
  // setId(value: number) {
  //   this.id = value;
  // }
  //
  // getOrderList(): ItemEntry[] {
  //   return this.orderList;
  // }
  //
  // setOrderList(value: ItemEntry[]) {
  //   this.orderList = value;
  // }
  //
  // getOrderPrice(): number {
  //   return this.orderPrice;
  // }
  //
  // setOrderPrice(value: number) {
  //   this.orderPrice = value;
  // }
  //
  // getClient(): User {
  //   return this.client;
  // }
  //
  // setClient(value: User) {
  //   this.client = value;
  // }
  //
  // getShipment(): Shipment2 {
  //   return this.shipment;
  // }
  //
  // setShipment(value: Shipment2) {
  //   this.shipment = value;
  // }
  //
  // getStatus(): string {
  //   return this.status;
  // }
  //
  // setStatus(value: string) {
  //   this.status = value;
  // }
  //
  // getOrderDate(): Date {
  //   return this.orderDate;
  // }
  //
  // setOrderDate(value: Date) {
  //   this.orderDate = value;
  // }
}
