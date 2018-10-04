import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {User} from '../data-models/User';
import {Subscription} from 'rxjs';
import {DataAccessService} from '../data-access-services/data-access.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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

  subscriptionUsers: Subscription;
  subscriptionUsersCount: Subscription;
  files: any;

  @Output() userActivated = new EventEmitter<User>();
  @Input() showUserDetails = true;
  confirmPasswordProp = '1';

  constructor(private userService: DataAccessService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.userService.getUsersFromDb('http://localhost:8080/userPage');
    this.totalUserCount = this.userService.getTotalUserCount();
    this.subscriptionUsers = this.userService.usersChanged.subscribe((tempUsers: User[]) => {
      this.users = tempUsers;
      this.activeUser = this.users[0];
    });
    this.subscriptionUsersCount = this.userService.totalUserCountChanged.subscribe((count: number) => {
      this.totalUserCount = count;
    });

    // this.users = this.userService.getUsers ();
    this.itemsPerPage = 6;
    this.paginationArr = Array((this.totalUserCount % this.itemsPerPage) === 0 ?
      Math.floor(this.totalUserCount / this.itemsPerPage) : Math.floor(this.totalUserCount / this.itemsPerPage) + 1)
      .fill(0).map((x, i) => i);
    this.currentPage = 1;
    this.sortBy = 'id';
    // this.url = '';
    this.changeSortDirect = false;
    this.activeRow = -1;
    this.activeUserId = 0;
    this.url = 'http://localhost:8080/userPage?sortBy=' + this.sortBy
      + '&changeSortDirect=' + true + '&page=' + this.currentPage;
    console.log(this.url + ' from init users URL');
  }

  onSortGet(sortBy: string, changeSortDirect: boolean, page: number) {
    this.sortBy = sortBy;
    this.currentPage = page;
    this.url = 'http://localhost:8080/userPage?sortBy=' + this.sortBy
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
    this.userService.getUserDetailsOrders('http://localhost:8080/orders?userId=' + this.activeUser.id);
  }

  openAddUserModal(addUserModal) {
    this.modalService.open(addUserModal, {size: 'lg'});
  }

  onSubmitUser(form: HTMLFormElement) {
    console.log(form);
    let final_data;
    let newUserData: string[];
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
      // response.json();
      console.log(response);
    });

  }

  addPhoto(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }
}

