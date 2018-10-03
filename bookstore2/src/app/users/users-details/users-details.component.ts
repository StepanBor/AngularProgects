import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../data-models/User';
import {Order} from '../../data-models/Order';
import {DataAccessService} from '../../data-access-services/data-access.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit, OnChanges {

  @Input() activeUserDetails: User;

  userDetailsOrdersSubscription: Subscription;

  userDetailOrders: Order[];

  activeRowOrderTable: number;

  activeTabNum: number;

  iteratArray: number[];

  constructor(private userService: DataAccessService) {
  }

  ngOnInit() {

    this.activeUserDetails = new User(0, '', '', '', '', '', '',
      '', '', '');

    this.activeRowOrderTable = -1;

    this.activeTabNum = 0;
    // this.userDetailsOrdersSubscription = this.userService.userDetailsOrdersChanged.subscribe((orders: Order[]) => {
    //   this.userDetailOrders = orders;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const activeUsId: number = this.activeUserDetails.id;
    const reqUrl = 'http://localhost:8080/orders?userId=' + activeUsId;
    this.userService.getUserDetailsOrders2(reqUrl).subscribe(
      (orders: Order[]) => {
        this.userDetailOrders = orders;
        this.iteratArray = Array(this.userDetailOrders.length * 2).fill(0).map((x, i) => i);
        console.log(this.iteratArray);
      }
    );
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
