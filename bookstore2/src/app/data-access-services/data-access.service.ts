import {Injectable} from '@angular/core';
import {User} from '../data-models/User';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../data-models/Order';
import {BookItem} from '../data-models/BookItem';

@Injectable()
export class DataAccessService {

  usersChanged = new Subject<User[]>();
  totalUserCountChanged = new Subject<number>();
  userDetailsOrdersChanged = new Subject<Order[]>();

  ordersChanged = new Subject<Order[]>();
  totalOrderCountChanged = new Subject<number>();

  bookItemsChanged = new Subject<BookItem[]>();
  totalBookItemCountChanged = new Subject<number>();

  bookItems: BookItem[];
  totalBookItemCount: number;

  orders: Order[];
  totalOrderCount: number;

  private totalUserCount = 12;

  private users: User[] = [new User(100500, 'login1', 'email1',
    '111-000', 'adress1', 'name1', 'lastname1',
    'CUSTOMER', 'group1', 'avatarUrl'),
    new User(100500, 'login2', 'email1',
      '111-000', 'adress2', 'name2', 'lastname2',
      'CUSTOMER', 'group2', 'avatarUrl')];

  private userDetailsId = -1;

  // private userDetailsOrders: Order[] = [new Order([new BookItem(-1, '', '', '', '', '', -1, -1)],
  //   -1, new User(100500, 'login2', 'email1', '111-000', 'adress2', 'name2', 'lastname2',
  //     'CUSTOMER', 'group2', 'avatarUrl'), new Shipment2(-1, '', '', -1), '', new Date())];

  private userDetailsOrders: Order[];

  constructor(private http: Http) {
    this.getUsersFromDb('http://localhost:8080/userPage');
    this.getTotalUsersCount();
    this.getUserDetailsOrders('http://localhost:8080/orders');
    this.getOrders('http://localhost:8080/orders');
    this.getTotalOrderCount();
    this.getBookItems('http://localhost:8080/bookItems');
    this.getTotalBookItemsCount();
  }

  getUsersFromDb(reqUrl: string) {
    this.http.get(reqUrl).subscribe((response: Response) => {
      // console.log(response);
      const data = response.json();
      this.users = data;
      this.usersChanged.next(this.users);
    });
  }

  getTotalUsersCount() {
    this.http.get('http://localhost:8080/usersCount').subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalUserCount = data;
      // console.log('from get totalUserCount ' + data);
      this.totalUserCountChanged.next(this.totalUserCount);
    });
  }

  getUserDetailsOrders(reqUrl: string) {
    this.http.get(reqUrl).subscribe((response: Response) => {
      const data = response.json();
      this.userDetailsOrders = data;
      this.userDetailsOrdersChanged.next(data);
    });
  }

  getUserDetailsOrders2(reqUrl: string): Observable<Order[]> {
    console.log(reqUrl + '  get user orders!!!!!!!!');
    return this.http.get(reqUrl).pipe(map((response: Response) => {
      console.log(response + '  get orders');
      const orders: Order[] = response.json();
      return orders;
    }));
  }

  getUsers(): User[] {
    console.log(this.users.slice() + 'from get users');
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

  getOrders(reqUrl: string) {
    this.http.get(reqUrl).subscribe((response: Response) => {
      console.log(response + ' from get orders');
      const data = response.json();
      this.orders = data;
      this.ordersChanged.next(this.orders);
    });
  }

  getTotalOrderCount() {
    this.http.get('http://localhost:8080/orderCount').subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalOrderCount = data;
      // console.log('from get totalUserCount ' + data);
      this.totalOrderCountChanged.next(this.totalOrderCount);
    });
  }

  saveOrder(orderToSave: Order): Observable<Response> {
    // console.log(orderToSave.orderList + 'WWWWWWWWWWWWWWWWWWWW');
    return this.http.post('http://localhost:8080/saveOrder', orderToSave);
  }

  getBookItems(reqUrl: string) {
    this.http.get(reqUrl).subscribe((response: Response) => {
      console.log(response + ' from get books!!!!!!!!!!!!!!!!!!!!!!!!');
      const data = response.json();
      this.bookItems = data;
      this.bookItemsChanged.next(this.bookItems);
    });
  }

  getTotalBookItemsCount() {
    this.http.get('http://localhost:8080/bookCount').subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalBookItemCount = data;
      this.totalBookItemCountChanged.next(this.totalBookItemCount);
    });
  }

  deleteOrder(orderToDelete: Order): Observable<Response> {
    return this.http.post('http://localhost:8080/deleteOrder', orderToDelete);
  }

  createNewUser(data): Observable<Response> {
    return this.http.post('http://localhost:8080/createNewUser', data);
  }

}
