import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {User} from '../../data-models/User';
import {Order} from '../../data-models/Order';
import {DataAccessService} from '../../data-access-services/data-access.service';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit, OnChanges {

  @Input() activeUserDetails: User;

  @Output() userOrdersOutput = new EventEmitter<Order[]>();

  confirmPasswordProp = '';

  files: any;

  createUserReply = '';
  @ViewChild('userCreated') userCreated;

  activeUserChanged: boolean;

  userDetailsOrdersSubscription: Subscription;

  userDetailOrders: Order[];

  activeRowOrderTable: number;

  activeTabNum: number;

  iteratArray: number[];

  constructor(private userService: DataAccessService,
              private modalService: NgbModal) {
  }

  ngOnInit() {

    this.activeUserDetails = new User(0, '', '', '', '', '', '',
      '', '', '');

    this.activeRowOrderTable = -1;
    this.activeUserChanged = false;
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
        this.userOrdersOutput.emit(orders);
        this.iteratArray = Array(this.userDetailOrders.length * 2).fill(0).map((x, i) => i);
        // console.log(this.iteratArray);

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

  addPhoto(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  onSubmitUser(form: HTMLFormElement) {
    console.log(form);
    let final_data;
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
    formData.append('updateUser', 'true');
    formData.append('id', this.activeUserDetails.id.toString());

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

  openAddUserModal(addUserModal) {
    this.modalService.open(addUserModal);
  }
}
