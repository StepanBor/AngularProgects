import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {User} from '../data-models/User';
import {Order} from '../data-models/Order';
import {Subscription} from 'rxjs';
import {DataAccessService} from '../data-access-services/data-access.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit, OnChanges {

  serverURL = environment.serverURL;

  activeUserDetails: User;

  userDetailOrders: Order[];

  @Output() userOrdersOutput = new EventEmitter<Order[]>();

  confirmPasswordProp = '';

  files: any;

  createUserReply = '';

  @ViewChild('userCreated') userCreated;

  activeUserChanged: boolean;

  userDetailsOrdersSubscription: Subscription;

  userDetailsSubscription: Subscription;

  activeRowOrderTable: number;

  activeTabNum: number;

  iteratArray: number[];

  constructor(private dataAccessService: DataAccessService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.userDetailsSubscription = this.dataAccessService.loggedUserChanged
      .subscribe((user: User) => {
        this.activeUserDetails = user;
      });

    this.userDetailsOrdersSubscription = this.dataAccessService.loggedUserOrdersChanged
      .subscribe((orders: Order[]) => {
        this.userDetailOrders = orders;
      });

    this.activeUserDetails = this.dataAccessService.loggedUser;
    this.userDetailOrders = this.dataAccessService.loggedUserOrders;

    this.activeRowOrderTable = -1;
    this.activeUserChanged = false;
    this.activeTabNum = 0;
    this.iteratArray = Array(this.userDetailOrders.length * 2).fill(0).map((x, i) => i);
    // this.userDetailsOrdersSubscription = this.userService.userDetailsOrdersChanged.subscribe((orders: Order[]) => {
    //   this.userDetailOrders = orders;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const activeUsId: number = this.activeUserDetails.id;
    const reqUrl = this.serverURL + 'orders?userId=' + activeUsId;
    this.dataAccessService.getUserDetailsOrders2(reqUrl).subscribe(
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

    this.dataAccessService.createNewUser(final_data).subscribe((response) => {
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
