import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Order} from '../../data-models/Order';
import {DataAccessService} from '../../data-access-services/data-access.service';
import {ItemEntry} from '../../data-models/ItemEntry';
import {CanComponentDeactivate} from '../../can-deactivate-guard.service';
import {Observable} from 'rxjs';
import {BookItem} from '../../data-models/BookItem';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../data-models/User';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges {

  @Input() activeOrder: Order;

  @Input() bookItems: BookItem[];

  iteratArray: number[];

  activeRowOrderTable: number;

  itemsPerPage: number;

  paginationArr: number[];

  activeTabNum: number;

  isModalActive: boolean;

  itemToRemove: ItemEntry;

  isActiveOrderChanged: boolean;

  isModalBookListActive: boolean;

  // isModalSaveActive: boolean;

  @Output() orderChanged = new EventEmitter<number>();

  @Output() activeOrderSaved = new EventEmitter<Order>();

  itemEntry5: ItemEntry;

  constructor(private orderService: DataAccessService,
              private modalService: NgbModal) {
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
    this.isModalBookListActive = false;
    // this.isModalSaveActive = false;
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
    console.log(this.activeOrder.orderList + '!!!!!!!!!!!');
    // this.activeOrder.setOrderPrice(this.activeOrder.getOrderPrice() + itemEntry.getValue() * itemEntry.getKey().getPrice());
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

  openBooklistModal() {
    this.isModalBookListActive = true;
  }


  addItemToOrder(bookItem: BookItem) {

    for (const itemEntry of this.activeOrder.orderList) {
      if (itemEntry.key.id === bookItem.id) {
        itemEntry.value++;
        this.activeOrder.orderPrice = this.activeOrder.orderPrice + bookItem.price;
        this.orderChanged.emit(this.activeOrder.id);
        return;
      }
    }
    const itemEntry2 = new ItemEntry(bookItem, 1);
    this.itemEntry5 = itemEntry2;
    this.activeOrder.orderList.push(itemEntry2);
    this.activeOrder.orderPrice = this.activeOrder.orderPrice + bookItem.price;
    this.orderChanged.emit(this.activeOrder.id);
  }

  onSaveOrder(orderToSave: Order) {
    this.activeOrderSaved.emit(orderToSave);
  }

  // probe(dropInp: HTMLButtonElement) {
  //   console.log(dropInp.attributes.dropdownShow.nodeValue);
  //   dropInp.attributes.dropdownShow.nodeValue = 'true';
  //   console.log(dropInp.attributes.dropdownShow.nodeValue);
  // }

  changeOrderStatus(status: string) {
    this.activeOrder.status = status;
    this.orderChanged.emit(this.activeOrder.id);
  }

  changeShipment(formElement: NgForm) {
    this.activeOrder.shipment.shippingAddress = formElement.value.deliveryAdress;
    this.activeOrder.shipment.shipmentStatus = formElement.value.deliveryStatus;
    this.orderChanged.emit(this.activeOrder.id);
  }

  togglePopover(popover, id?: number) {
    if (id == null) {
      popover.close();
    } else if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({id});
    }
  }

  openAddOrderModal(editOrderUser) {
    this.modalService.open(editOrderUser, {size: 'lg'});
  }

  setUserInActiveOrder(user: User) {
    this.activeOrder.client = user;
    this.orderChanged.emit(this.activeOrder.id);
  }
}
