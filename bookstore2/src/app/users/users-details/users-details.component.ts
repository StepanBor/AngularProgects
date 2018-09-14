import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../data-models/User';
import {Order} from '../../data-models/Order';
import {UserDataAccessService} from '../../data-access-services/user.data-access.service';
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


  constructor(private userService: UserDataAccessService) {
  }

  ngOnInit() {

    this.activeUserDetails = new User(0, '', '', '', '', '', '',
      '', '', '');

    this.activeRowOrderTable = -1;
    // this.userDetailsOrdersSubscription = this.userService.userDetailsOrdersChanged.subscribe((orders: Order[]) => {
    //   this.userDetailOrders = orders;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.userService.getUserDetailsOrders2('http://localhost:8080/orders?userId=' + this.activeUserDetails.id).subscribe(
      (orders: Order[]) => {
        this.userDetailOrders = orders;
        // console.log(orders);
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

}
