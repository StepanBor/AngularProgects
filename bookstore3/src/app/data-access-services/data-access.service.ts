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
import {ItemEntry} from '../data-models/ItemEntry';

@Injectable()
export class DataAccessService {

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
  shoppingCart: ItemEntry[];
  // storageBooks: StorageBooks;

  orders: Order[];
  totalOrderCount: number;
  totalUnProcessedOrderCount: number;

  totalShoppingCartSum: number;
  totalShoppingCartSumChanged = new Subject<number>();

  accessToken: string;

  loggedUser: User;
  loggedUserOrders: Order[];
  loggedUserOrdersChanged = new Subject<Order[]>();
  loggedUserChanged = new Subject<User>();
  serverReply: string;

  activeFilters: Map<string, string[]> = new Map();
  activeFiltersChanged = new Subject<Map<string, string[]>>();

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
    this.getUsersFromDb('http://localhost:8080/userPage');
    this.getTotalUsersCount();
    this.getUnprocessedOrdersCount();
    this.getUserDetailsOrders('http://localhost:8080/orders');
    this.getOrders('http://localhost:8080/orders');
    this.getTotalOrderCount();
    this.getBookItems('http://localhost:8080/bookItems');
    this.getTotalBookItemsCount();
    this.shoppingCart = [];
    this.totalShoppingCartSum = 0;
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
    return this.http.post('http://localhost:8080/saveOrder', orderToSave);
  }

  getBookItems(reqUrl: string) {
    this.http.get(reqUrl).subscribe((response: Response) => {
      // console.log(response + ' from get books!!!!!!!!!!!!!!!!!!!!!!!!');
      const data = response.json();
      this.bookItems = data;
      this.bookItemsChanged.next(this.bookItems);
    });
  }

  getBookItems2(reqUrl: string): Observable<Response> {
    return this.http.get(reqUrl);
  }

  getBookItemsByParam(paramName: string, paramValue: string): Observable<Response> {
    return this.http.get('http://localhost:8080/bookItemsByParam?' + paramName + '=' + paramValue);
  }

  getBookItemsByParam2(filters: Map<string, string[]>,
                       sortBy: string,
                       itemsPerPage: number,
                       page: number,
                       changeSortDirect: boolean) {
    let reqUrl = 'http://localhost:8080/bookItemsByParam?';
    for (let key of Array.from(filters.keys())) {
      for (let j = 0; j < filters.get(key).length; j++) {
        reqUrl = reqUrl + key + '=' + filters.get(key)[j] + '&';
      }
    }
    reqUrl = reqUrl + 'sortBy=' + sortBy + '&itemsPerPage=' + itemsPerPage
      + '&page=' + page + '&changeSortDirect=' + changeSortDirect;
    console.log(reqUrl);
    this.http.get(reqUrl).subscribe((response: Response) => {
      const data = response.json();
      this.bookItems = data.bookItems;
      this.totalBookItemCount = data.totalCountByParam;
      this.bookItemsChanged.next(this.bookItems);
      this.totalBookItemCountChanged.next(this.totalBookItemCount);
    });
  }

  // getBookItemsBy(params: Object[]):Observable<Response>{
  //   return this.http.get('http://localhost:8080/bookItemsByParam?' + paramName + '=' + paramValue);
  // }

  getTotalBookItemsCount() {
    this.http.get('http://localhost:8080/bookCount').subscribe((responce: Response) => {
      const data: number = responce.json();
      this.totalBookItemCount = data;
      this.totalBookItemCountChanged.next(this.totalBookItemCount);
    });
  }


  createNewUser(data): Observable<Response> {
    return this.http.post('http://localhost:8080/createNewUser', data);
  }

  login(data) {
    this.http.post('http://localhost:8080/signin', data).subscribe((response) => {
      // console.log(response);
      if (response.status === 200) {
        const serverReply = response.json();
        this.accessToken = serverReply.accessToken;
        const header = new Headers({'Authorization': this.accessToken});
        this.http.get('http://localhost:8080/userInfo?login=' + data.login, {headers: header}).subscribe((response2) => {
          if (response2.status === 200) {
            const serverReply2 = response2.json();
            this.loggedUser = serverReply2.clientDTO;
            this.loggedUserOrders = serverReply2.clientOrders;
            this.loggedUserChanged.next(this.loggedUser);
            this.loggedUserOrdersChanged.next(this.loggedUserOrders);
            // console.log(response2);
            // console.log(serverReply2.clientDTO);
            // console.log(serverReply2.clientOrders);
          }
        });
        // console.log(this.accessToken);
      } else {
        // const serverReply: string[] = response.json();
        this.serverReply = 'wrong login or password';
        // this.openModal(this.userCreated);
      }
    });
  }

  logout() {
    this.loggedUser = null;
    this.loggedUserOrders = null;
    this.loggedUserChanged.next(this.loggedUser);
    this.loggedUserOrdersChanged.next(this.loggedUserOrders);
  }

  submitOrder(data): Observable<Response> {
    return this.http.post('http://localhost:8080/submitOrder', data);
  }

  createNewOrder(): Observable<Response> {
    return this.http.get('http://localhost:8080/createNewOrder');
  }

  getUnprocessedOrdersCount() {
    this.http.get('http://localhost:8080/countOrdersByParam?paramName=status&paramValue=unProcessed')
      .subscribe((responce: Response) => {
        const data: number = responce.json();
        this.totalUnProcessedOrderCount = data;
        this.totalUnProcessedOrdersChanged.next(this.totalUnProcessedOrderCount);
      });
  }

  countOrdersByParam(paramName: string, paramValue: string): Observable<Response> {
    return this.http.get('http://localhost:8080/countOrdersByParam?paramName='
      + paramName + '&paramValue=' + paramValue);
  }

  getAllOrders(): Observable<Response> {
    return this.http.get('http://localhost:8080/orders?allOrders=true');
  }

  getRates() {
    return this.http.get('http://localhost:8080/rates')
      .subscribe((responce) => {
        const data = responce.json();
        this.USDUAH.next(Math.round(data.quotes.USDUAH * 1000) / 1000);
        this.EURUAH.next(Math.round(data.quotes.USDUAH / data.quotes.USDEUR * 1000) / 1000);
        this.RUBUAH.next(Math.round(data.quotes.USDUAH / data.quotes.USDRUB * 1000) / 1000);
      });
  }

  getTasks(): Observable<Response> {
    return this.http.get('http://localhost:8080/getTasks');
  }

  updateTask(task: Task1) {
    this.http.post('http://localhost:8080/tasks', task).subscribe((response) => {
      console.log(response);
    });
  }

  deleteTasks(task: Task1): Observable<Response> {
    task.status = 'closed';
    return this.http.post('http://localhost:8080/tasks', task);
  }

  deleteUser(userId: number): Observable<Response> {
    return this.http.get('http://localhost:8080/deleteUser?userId=' + userId);
  }

  saveBookItem(bookToSave: BookItem): Observable<Response> {
    return this.http.post('http://localhost:8080/saveBookItem', bookToSave);
  }

  deleteBookItem(bookItemId: number): Observable<Response> {
    return this.http.post('http://localhost:8080/saveBookItem', bookItemId);
  }

  createNewBookItem(data): Observable<Response> {
    return this.http.post('http://localhost:8080/createNewBookItem', data);
  }

  // getStorageBooks() {
  //   this.http.get('http://localhost:8080/storageBook').subscribe((response: Response) => {
  //     // console.log(response + ' from get books!!!!!!!!!!!!!!!!!!!!!!!!');
  //     const data = response.json();
  //     this.storageBooks = data;
  //     this.storageBooksChanged.next(this.storageBooks);
  //   });
  // }

  getBookParameters(): Observable<Response> {
    return this.http.get('http://localhost:8080/getBookParameters');
  }

  addToCart(bookItem: BookItem, quantity: number) {
    let num = 0;
    let shopSum = 0;
    for (const itemEntry of this.shoppingCart) {
      if (itemEntry.key.id === bookItem.id) {
        itemEntry.value = itemEntry.value + quantity;
        num = 1;
        break;
      }
    }

    if (num === 0) {
      this.shoppingCart.push(new ItemEntry(bookItem, quantity));

    }
    for (const itemEntry of this.shoppingCart) {
      shopSum = shopSum + itemEntry.key.price * itemEntry.value;

    }

    this.totalShoppingCartSum = Math.floor(shopSum * 100) / 100;

    this.totalShoppingCartSumChanged.next(this.totalShoppingCartSum);

  }

  deleteFromCart(bookItem: BookItem) {
    let ind = -1;
    let shopSum = 0;
    for (let i = 0; i < this.shoppingCart.length; i++) {
      if (this.shoppingCart[i].key.id === bookItem.id) {
        this.shoppingCart[i].value--;
        if (this.shoppingCart[i].value <= 0) {
          ind = i;
          break;
        }
      }
    }
    if (ind !== -1) {
      this.shoppingCart.splice(ind, 1);
    }
    for (const itemEntry of this.shoppingCart) {
      shopSum = shopSum + itemEntry.key.price * itemEntry.value;

    }

    this.totalShoppingCartSum = Math.floor(shopSum * 100) / 100;

    this.totalShoppingCartSumChanged.next(this.totalShoppingCartSum);
  }

  getFromCart(bookItem: BookItem): number | null {
    for (const itemEntry of this.shoppingCart) {
      if (itemEntry.key.id === bookItem.id) {
        return itemEntry.value;
      }
    }
    return null;
  }


}
