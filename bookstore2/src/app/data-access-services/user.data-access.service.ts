import {Injectable} from '@angular/core';
import {User} from '../data-models/User';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserDataAccessService {

  usersChanged = new Subject<User[]>();
  totalUserCountChanged = new Subject<number>();

  private totalUserCount = 12;
  private users: User[] = [new User(100500, 'login1', 'email1',
    '111-000', 'adress1', 'name1', 'lastname1',
    'CUSTOMER', 'group1', 'avatarUrl'),
    new User(100500, 'login2', 'email1',
      '111-000', 'adress2', 'name2', 'lastname2',
      'CUSTOMER', 'group2', 'avatarUrl')];

  constructor(private http: Http) {
    console.log('from userService constructor ' + this.users);
    this.getUsersFromDb('http://localhost:8080/userPage');
    this.getTotalUsersCount();
    console.log('from userService constructor ' + this.getUsers());
  }

  getUsersFromDb(reqUrl: string) {
    this.http.get(reqUrl)/*.pipe(map((responce: Response) => {
    console.log(responce);
    responce.json();
    return uers: User[];
    }))*/.subscribe((response: Response) => {
      console.log(response);
      const data = response.json();
      // this.setUsers(data1);
      this.users = data;
      console.log('from get users ' + data);
      console.log('from get users ' + this.users);
      this.usersChanged.next(data);
    });
  }

  getTotalUsersCount() {
    this.http.get('http://localhost:8080/usersCount').subscribe((responce: Response) => {
      const data: number = responce.json();
      // this.setTotalUserCount(data);
      this.totalUserCount = data;
      console.log('from get totalUserCount ' + data);
      this.totalUserCountChanged.next(this.totalUserCount);
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
