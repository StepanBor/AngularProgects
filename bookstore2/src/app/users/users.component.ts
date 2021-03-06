import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {User} from '../data-models/User';
import {Subscription} from 'rxjs';
import {DataAccessService} from '../data-access-services/data-access.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {Order} from '../data-models/Order';
import {ItemEntry} from '../data-models/ItemEntry';
import {BookItem} from '../data-models/BookItem';
import {Shipment2} from '../data-models/Shipment2';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  serverURL = environment.serverURL;

  title = 'bookstore2';
  isSidebarOn = false;

  users: User[] = [];
  totalUserCount = 12;
  itemsPerPage: number;
  paginationArr: number[];
  currentPage: number;
  sortBy: string;
  url: string;
  changeSortDirect: boolean;
  activeRow: number;
  activeUserId: number;
  activeUser: User;

  activeUserOrders: Order[];
  subscriptionUsers: Subscription;
  subscriptionUsersCount: Subscription;
  files: any;

  @Output() userActivated = new EventEmitter<User>();
  @Input() showUserDetails = true;
  @ViewChild('userCreated') userCreated;
  confirmPasswordProp = '';

  createUserReply: string;

  constructor(private userService: DataAccessService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.activeUserOrders = [new Order(
      [new ItemEntry(new BookItem(0, '', '', '', '', '', 0, 0, 0, '', 0), 0)],
      0, new User(0, '', '', '', '', '', '', '', '', ''),
      new Shipment2(0, '', '', 0), '', new Date)];
    this.activeUser = new User(0, '', '', '', '', '', '', '', '', '');
    this.userService.getUsersFromDb(this.serverURL + 'userPage');
    this.totalUserCount = this.userService.getTotalUserCount();
    this.subscriptionUsers = this.userService.usersChanged.subscribe((tempUsers: User[]) => {
      this.users = tempUsers;
      this.activeUser = this.users[0];
    });
    this.subscriptionUsersCount = this.userService.totalUserCountChanged.subscribe((count: number) => {
      this.totalUserCount = count;
    });

    this.itemsPerPage = 6;
    this.paginationArr = Array((this.totalUserCount % this.itemsPerPage) === 0 ?
      Math.floor(this.totalUserCount / this.itemsPerPage) : Math.floor(this.totalUserCount / this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
    this.currentPage = 1;
    this.sortBy = 'id';
    this.changeSortDirect = false;
    this.activeRow = -1;
    this.activeUserId = 0;
    this.url = this.serverURL + 'userPage?sortBy=' + this.sortBy
      + '&changeSortDirect=' + true + '&page=' + this.currentPage;
    console.log(this.url + ' from init users URL');
  }

  onSortGet(sortBy: string, changeSortDirect: boolean, page: number) {
    this.sortBy = sortBy;
    this.currentPage = page;
    this.url = this.serverURL + 'userPage?sortBy=' + this.sortBy
      + '&changeSortDirect=' + changeSortDirect + '&page=' + this.currentPage;
    this.userService.getUsersFromDb(this.url);
    this.totalUserCount = this.userService.getTotalUserCount();
    this.itemsPerPage = 6;
    this.paginationArr = Array((this.totalUserCount % this.itemsPerPage) === 0 ?
      Math.floor(this.totalUserCount / this.itemsPerPage) : Math.floor(this.totalUserCount / this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
  }

  setActiveRow(index: number, userId: number) {
    this.activeRow = index;
    this.activeUserId = userId;
    for (const user of this.users) {
      if (user.id === userId) {
        this.activeUser = user;
      }
    }
    this.userActivated.emit(this.activeUser);
    this.userService.getUserDetailsOrders(this.serverURL + 'orders?userId=' + this.activeUser.id);
  }

  openAddUserModal(addUserModal) {
    this.modalService.open(addUserModal, {size: 'lg'});
  }

  openDeleteUserModal(deleteUserModal) {
    this.modalService.open(deleteUserModal);
  }

  onSubmitUser(form: HTMLFormElement) {
    console.log(form);
    let final_data;
    // let newUserData: string[];
    const formData = new FormData();
    if (this.files != null) {
      const files: FileList = this.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('photo', files[i]);
      }
    }
    formData.append('login', form.value.login);
    formData.append('email', form.value.email);
    formData.append('phone', form.value.phone);
    formData.append('address', form.value.address);
    formData.append('name', form.value.name);
    formData.append('lastname', form.value.lastname);
    formData.append('password', form.value.password);

    final_data = formData;
    // } else {
    //   // Если нет файла, то слать как обычный JSON
    //   final_data = form.value;
    // }

    this.userService.createNewUser(final_data).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        const serverReply: string[] = response.json();
        this.createUserReply = serverReply[0];
        this.openAddUserModal(this.userCreated);
      }
    });

  }

  addPhoto(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  deleteUser(userId: number) {
    confirm('Delete user id ' + userId);
    this.userService.deleteUser(userId).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        this.createUserReply = 'user deleted';
      }
      this.userService.getUsersFromDb(this.serverURL + 'userPage');
      this.openAddUserModal(this.userCreated);
    });

  }

  onSidebarOn() {
    this.isSidebarOn = !this.isSidebarOn;
  }
}

