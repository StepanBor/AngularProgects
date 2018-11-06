import {Injectable} from '@angular/core';
import {User} from '../data-models/User';
import {Http, Headers} from '@angular/http';
import {Response} from '@angular/http';
import {Observable, Subject} from 'rxjs';
import {count, map} from 'rxjs/operators';
import {Order} from '../data-models/Order';
import {BookItem} from '../data-models/BookItem';
import {Task1} from '../data-models/Task1';
import {StorageBooks} from '../data-models/StorageBooks';
import {environment} from '../../environments/environment';

@Injectable()
export class DataAccessService {

  serverURL = environment.serverURL;

  usersChanged = new Subject<User[]>();
  totalUserCountChanged = new Subject<number>();
  userDetailsOrdersChanged = new Subject<Order[]>();
  totalUnProcessedOrdersChanged = new Subject<number>();

  ordersChanged = new Subject<Order[]>();
  totalOrderCountChanged = new Subject<number>();

  bookItemsChanged = new Subject<BookItem[]>();
  totalBookItemCountChanged = new Subject<number>();

  // storageBooksChanged = new Subject<StorageBooks>();

  USDUAH = new Subject<number>();
  EURUAH = new Subject<number>();
  RUBUAH = new Subject<number>();
  task: Task1;

  bookItems: BookItem[];
  totalBookItemCount: number;
  // storageBooks: StorageBooks;

  orders: Order[];
  totalOrderCount: number;
  totalUnProcessedOrderCount: number;
  activeOrder: Order;

  accessToken: string;
  loggedUser: User;
  authHeader: Headers;

  loggedUserOrders: Order[];
  loggedUserOrdersChanged = new Subject<Order[]>();
  loggedUserChanged = new Subject<User>();
  serverReplyChanged = new Subject<string>();
  serverReply: string;

  private totalUserCount = 12;

  private users: User[] = [new User(100500, 'login1', 'email1',
    '111-000', 'adress1', 'name1', 'lastname1',
    'CUSTOMER', 'group1', 'avatarUrl'),
    new User(100500, 'login2', 'email1',
      '111-000', 'adress2', 'name2', 'lastname2',
      'CUSTOMER', 'group2', 'avatarUrl')];

  private userDetailsId = -1;

  private userDetailsOrders: Order[];

  constructor(private http: Http) {
    this.getUsersFromDb(this.serverURL + 'userPage');
    this.getTotalUsersCount();
    this.getUnprocessedOrdersCount();
    this.getUserDetailsOrders(this.serverURL + 'orders');
    this.getOrders(this.serverURL + 'orders');
    this.getTotalOrderCount();
    this.getBookItems(this.serverURL + 'bookItems');
    this.getTotalBookItemsCount();
  }

  getUsersFromDb(reqUrl: string) {
    this.http.get(reqUrl, {headers: this.authHeader}).subscribe((response: Response) => {
      // console.log(response);
      const data = response.json();
      this.users = data;
      this.usersChanged.next(this.users);
    });
  }

  getTotalUsersCount() {
    this.http.get(this.serverURL + 'usersCount', {headers: this.authHeader}).subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalUserCount = data;
      // console.log('from get totalUserCount ' + data);
      this.totalUserCountChanged.next(this.totalUserCount);
    });
  }

  getUserDetailsOrders(reqUrl: string) {
    this.http.get(reqUrl, {headers: this.authHeader}).subscribe((response: Response) => {
      const data = response.json();
      this.userDetailsOrders = data;
      this.userDetailsOrdersChanged.next(data);
    });
  }

  getUserDetailsOrders2(reqUrl: string): Observable<Order[]> {
    console.log(reqUrl + '  get user orders!!!!!!!!');
    return this.http.get(reqUrl, {headers: this.authHeader}).pipe(map((response: Response) => {
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
    console.log(this.authHeader);
    this.http.get(reqUrl, {headers: this.authHeader}).subscribe((response: Response) => {
      console.log(response + ' from get orders');
      const data = response.json();
      this.orders = data;
      this.activeOrder = this.orders[0];
      this.ordersChanged.next(this.orders);
    });
  }

  getTotalOrderCount() {
    this.http.get(this.serverURL + 'orderCount', {headers: this.authHeader}).subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalOrderCount = data;
      // console.log('from get totalUserCount ' + data);
      this.totalOrderCountChanged.next(this.totalOrderCount);
    });
  }

  saveOrder(orderToSave: Order): Observable<Response> {
    return this.http.post(this.serverURL + 'saveOrder', orderToSave, {headers: this.authHeader});
  }

  getBookItems(reqUrl: string) {
    this.http.get(reqUrl, {headers: this.authHeader}).subscribe((response: Response) => {
      const data = response.json();
      this.bookItems = data;
      this.bookItemsChanged.next(this.bookItems);
    });
  }

  getBookParameters(): Observable<Response> {
    return this.http.get(this.serverURL + 'getBookParameters', {headers: this.authHeader});
  }

  getBookItemsByParam(paramName: string, paramValue: string): Observable<Response> {
    return this.http.get(this.serverURL + 'bookItemsByParam?' + paramName + '=' + paramValue, {headers: this.authHeader});
  }

  getTotalBookItemsCount() {
    this.http.get(this.serverURL + 'bookCount', {headers: this.authHeader}).subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalBookItemCount = data;
      this.totalBookItemCountChanged.next(this.totalBookItemCount);
    });
  }

  deleteOrder(orderToDelete: Order): Observable<Response> {
    return this.http.post(this.serverURL + 'deleteBookItem', orderToDelete, {headers: this.authHeader});
  }

  createNewUser(data): Observable<Response> {
    return this.http.post(this.serverURL + 'createNewUser', data, {headers: this.authHeader});
  }

  createNewOrder(): Observable<Response> {
    return this.http.get(this.serverURL + 'createNewOrder', {headers: this.authHeader});
  }

  getUnprocessedOrdersCount() {
    this.http.get(this.serverURL + 'countOrdersByParam?paramName=status&paramValue=unProcessed', {headers: this.authHeader})
      .subscribe((responce: Response) => {
        const data: number = responce.json();
        this.totalUnProcessedOrderCount = data;
        this.totalUnProcessedOrdersChanged.next(this.totalUnProcessedOrderCount);
      });
  }

  countOrdersByParam(paramName: string, paramValue: string): Observable<Response> {
    return this.http.get(this.serverURL + 'countOrdersByParam?paramName='
      + paramName + '&paramValue=' + paramValue);
  }

  getAllOrders(): Observable<Response> {
    return this.http.get(this.serverURL + 'orders?allOrders=true', {headers: this.authHeader});
  }

  getRates() {
    return this.http.get(this.serverURL + 'rates', {headers: this.authHeader})
      .subscribe((responce) => {
        const data = responce.json();
        this.USDUAH.next(Math.round(data.quotes.USDUAH * 1000) / 1000);
        this.EURUAH.next(Math.round(data.quotes.USDUAH / data.quotes.USDEUR * 1000) / 1000);
        this.RUBUAH.next(Math.round(data.quotes.USDUAH / data.quotes.USDRUB * 1000) / 1000);
      });
  }

  getTasks(): Observable<Response> {
    return this.http.get(this.serverURL + 'getTasks', {headers: this.authHeader});
  }

  updateTask(task: Task1) {
    this.http.post(this.serverURL + 'tasks', task, {headers: this.authHeader}).subscribe((response) => {
      console.log(response);
    });
  }

  deleteTasks(task: Task1): Observable<Response> {
    task.status = 'closed';
    return this.http.post(this.serverURL + 'tasks', task, {headers: this.authHeader});
  }

  deleteUser(userId: number): Observable<Response> {
    return this.http.get(this.serverURL + 'deleteUser?userId=' + userId, {headers: this.authHeader});
  }

  saveBookItem(bookToSave: BookItem): Observable<Response> {
    return this.http.post(this.serverURL + 'saveBookItem', bookToSave, {headers: this.authHeader});
  }

  deleteBookItem(bookToDelete: BookItem): Observable<Response> {
    return this.http.post(this.serverURL + 'deleteBookItem', bookToDelete, {headers: this.authHeader});
  }

  createNewBookItem(data): Observable<Response> {
    return this.http.post(this.serverURL + 'createNewBookItem', data, {headers: this.authHeader});
  }

  addBooks(data): Observable<Response> {
    return this.http.post(this.serverURL + 'addBooks', data, {headers: this.authHeader});
  }

  createNewPublisher(data): Observable<Response> {
    return this.http.post(this.serverURL + 'createNewPublisher', data, {headers: this.authHeader});
  }

  createNewCategory(data): Observable<Response> {
    return this.http.post(this.serverURL + 'createNewCategory', data, {headers: this.authHeader});
  }

  login(data) {
    this.http.post(this.serverURL + 'signinAdmin', data).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        const serverReply = response.json();
        this.accessToken = serverReply.accessToken;
        console.log(this.accessToken);
        this.authHeader = new Headers({'Authorization': 'Bearer ' + this.accessToken});
        const header = new Headers({'Authorization': this.accessToken});
        this.http.get(this.serverURL + 'userInfo?login=' + data.login, {headers: header}).subscribe((response2) => {
          if (response2.status === 200) {
            const serverReply2 = response2.json();
            this.loggedUser = serverReply2.clientDTO;
            this.loggedUserOrders = serverReply2.clientOrders;
            this.loggedUserChanged.next(this.loggedUser);
            this.loggedUserOrdersChanged.next(this.loggedUserOrders);
            this.serverReply = 'you logged in as ' + this.loggedUser.login;
            this.serverReplyChanged.next(this.serverReply);
            // console.log(response2);
            // console.log(serverReply2.clientDTO);
            // console.log(serverReply2.clientOrders);
          }
        });
        // console.log(this.accessToken);
      }
      if (response.status === 401) {
        // const serverReply: string[] = response.json();
        this.serverReply = 'wrong login or password';
        this.serverReplyChanged.next(this.serverReply);
        // this.openModal(this.userCreated);
      }
    }, (error) => {
      this.serverReply = 'wrong login or password';
      this.serverReplyChanged.next(this.serverReply);
    });
  }

  logout() {
    this.loggedUser = null;
    this.loggedUserOrders = null;
    this.loggedUserChanged.next(this.loggedUser);
    this.loggedUserOrdersChanged.next(this.loggedUserOrders);
  }

  isAuthenticated(): boolean {
    if (this.loggedUser != null && (this.loggedUser.role === 'ADMIN' || this.loggedUser.role === 'MANAGER')) {
      return true;
    } else {
      return false;
    }
  }

  getTableSample() {
    this.http.get(this.serverURL + 'static/Books111018.xls').subscribe();
  }

}
