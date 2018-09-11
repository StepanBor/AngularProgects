import {Component, OnInit} from '@angular/core';
import {User} from '../data-models/User';
import {Subscription} from 'rxjs';
import {UserDataAccessService} from '../data-access-services/user.data-access.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  totalUserCount: number;
  itemsPerPage: number;
  paginationArr: number[];
  currentPage: number;
  sortBy: string;
  url: string;
  changeSortDirect: boolean;

  subscriptionUsers: Subscription;
  subscriptionUsersCount: Subscription;

  constructor(private userService: UserDataAccessService) {
  }

  ngOnInit() {

    this.subscriptionUsers = this.userService.usersChanged.subscribe((tempUsers: User[]) => {
      this.users = tempUsers;
    });
    this.subscriptionUsersCount = this.userService.totalUserCountChanged.subscribe((count: number) => {
      this.totalUserCount = count;
    });

    this.users = this.userService.getUsers();
    this.totalUserCount = this.userService.getTotalUserCount();

    this.itemsPerPage = 6;
    this.paginationArr = Array((this.totalUserCount / this.itemsPerPage)).fill(0).map((x, i) => i);
    this.currentPage = 1;
    this.sortBy = 'id';
    this.url = '';
    this.changeSortDirect = false;
    console.log('total user count ngOninit method ' + this.totalUserCount);
    console.log('pagination arr ' + this.paginationArr);

  }

  onSortGet(sortBy: string, changeSortDirect: boolean, page: number) {
    this.sortBy = sortBy;
    this.currentPage = page;
    this.url = 'http://localhost:8080/userPage?sortBy=' + this.sortBy
      + '&changeSortDirect=' + changeSortDirect + '&page=' + this.currentPage;
    console.log('onSortGet() url --' + this.url);
    this.userService.getUsersFromDb(this.url);
    this.totalUserCount = this.userService.getTotalUserCount();
    this.itemsPerPage = 6;
    this.paginationArr = Array((this.totalUserCount % this.itemsPerPage) === 0 ?
      Math.floor(this.totalUserCount / this.itemsPerPage) : Math.floor(this.totalUserCount / this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
    console.log('total user count ' + this.totalUserCount);
    console.log('pagination arr ' + this.paginationArr);
  }
}
