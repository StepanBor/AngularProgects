import {Injectable} from '@angular/core';
import {User} from '../data-models/User';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../data-models/Order';
import {BookItem} from '../data-models/BookItem';

@Injectable()
export class UserDataAccessService {

  usersChanged = new Subject<User[]>();
  totalUserCountChanged = new Subject<number>();
  userDetailsOrdersChanged = new Subject<Order>();


  private totalUserCount = 12;
  private users: User[] = [new User(100500, 'login1', 'email1',
    '111-000', 'adress1', 'name1', 'lastname1',
    'CUSTOMER', 'group1', 'avatarUrl'),
    new User(100500, 'login2', 'email1',
      '111-000', 'adress2', 'name2', 'lastname2',
      'CUSTOMER', 'group2', 'avatarUrl')];
  private userDetailsId = -1;
  private userDetailsOrders: Order[] = [new Order(-1, [], -1, [], -1,
    '', '')];

  constructor(private http: Http) {
    this.getUsersFromDb('http://localhost:8080/userPage');
    this.getTotalUsersCount();
    this.getUserDetailsOrders('http://localhost:8080/orders');
  }

  getUsersFromDb(reqUrl: string) {
    this.http.get(reqUrl).subscribe((response: Response) => {
      console.log(response);
      const data = response.json();
      this.users = data;
      console.log('from get users ' + data);
      console.log('from get users ' + this.users);
      this.usersChanged.next(data);
    });
  }

  getTotalUsersCount() {
    this.http.get('http://localhost:8080/usersCount').subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalUserCount = data;
      console.log('from get totalUserCount ' + data);
      this.totalUserCountChanged.next(this.totalUserCount);
    });
  }

  getUserDetailsOrders(reqUrl: string) {
    this.http.get(reqUrl).subscribe((response: Response) => {
      const data = response.json();
      this.userDetailsOrders = data;
      this.userDetailsOrdersChanged.next(data);
      console.log(data);
    });
  }

  getUsers(): User[] {
    return this.users.slice();
  }

  setUsers(value: User[]) {
    this.users = value;
    console.log('from set users ' + value);
    this.usersChanged.next(this.users.slice());
  }

  getTotalUserCount(): number {
    return this.totalUserCount;
  }

  setTotalUserCount(value: number) {
    this.totalUserCount = value;
    console.log('from set totalUserCount ' + value);
    this.totalUserCountChanged.next(this.totalUserCount);
  }

}
