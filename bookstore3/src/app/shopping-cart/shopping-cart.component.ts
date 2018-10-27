import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemEntry} from '../data-models/ItemEntry';
import {Subscription} from 'rxjs';
import {DataAccessService} from '../data-access-services/data-access.service';
import {Router} from '@angular/router';
import {BookItem} from '../data-models/BookItem';
import {LoginNewUserComponent} from '../login-new-user/login-new-user.component';
import {User} from '../data-models/User';
import {Shipment2} from '../data-models/Shipment2';
import {Order} from '../data-models/Order';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  subscriptionShoppingCartSum: Subscription;
  subscriptionLoggedUserChanged: Subscription;
  subscriptionLoggedUserOrdersChanged: Subscription;

  shoppingCartSum: number;

  shoppingCart: ItemEntry[];

  activeRowIndex: number;

  activeBookItemId: number;

  activeBookItem: BookItem;

  loggedUser: User;

  loggedUserOrders: Order[];

  @ViewChild('userCreated') userCreated;
  files: any;
  serverReply = '';
  submitOrderReply = '';
  confirmPasswordProp = '';
  login = true;

  constructor(private dataAccessService: DataAccessService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loggedUser = this.dataAccessService.loggedUser;
    this.loggedUserOrders = this.dataAccessService.loggedUserOrders;
    this.activeRowIndex = 0;
    this.shoppingCart = this.dataAccessService.shoppingCart;
    this.activeBookItem = this.shoppingCart[0].key;
    this.activeBookItemId = this.activeBookItem.id;
    this.subscriptionShoppingCartSum = this.dataAccessService.totalShoppingCartSumChanged
      .subscribe((sum: number) => {
        this.shoppingCartSum = sum;
      });
    this.subscriptionLoggedUserChanged = this.dataAccessService.loggedUserChanged
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.subscriptionLoggedUserOrdersChanged = this.dataAccessService.loggedUserOrdersChanged
      .subscribe((orders: Order[]) => {
        this.loggedUserOrders = orders;
      });
    this.shoppingCartSum = this.dataAccessService.totalShoppingCartSum;

  }

  togglePopover(popover, id: number) {
    if (id == null) {
      popover.close();
    } else if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({id});
    }
  }

  onAddToCart(bookItem: BookItem) {

    this.dataAccessService.addToCart(bookItem, 1);

  }

  deleteFromCart(bookItem: BookItem) {
    this.dataAccessService.deleteFromCart(bookItem);
  }

  setActiveRow(index1: number, orderId: number) {
    this.activeRowIndex = index1;
    this.activeBookItemId = orderId;
    for (const entry of this.shoppingCart) {
      if (entry.key.id === orderId) {
        this.activeBookItem = entry.key;
      }
    }
  }

  openAddUserModal(addUserModal) {
    if (this.login) {
      this.modalService.open(addUserModal);
    } else {
      this.modalService.open(addUserModal, {size: 'lg'});
    }

  }

  onSubmitOrder(form: HTMLFormElement) {
    console.log(form);
    let final_data;
    const formData = new FormData();
    formData.append('email', form.value.email);
    formData.append('phone', form.value.phone);

    final_data = formData;

    let user = new User(0, null, form.value.email, form.value.phone,
      null, null, null, 'CUSTOMER', null, null);

    if (this.loggedUser != null) {
      user = this.loggedUser;
    }


    const order = new Order(this.shoppingCart, Math.floor(this.shoppingCartSum * 100) / 100, user,
      new Shipment2(0, 'default', 'unProcessed', 0),
      'unProcessed', new Date());

    this.dataAccessService.submitOrder(order).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        const serverReply: string[] = response.json();
        this.serverReply = serverReply[0];
        this.openModal(this.userCreated);
      }
    });
    this.router.navigate(['']);
    this.dataAccessService.shoppingCart.splice(0, this.dataAccessService.shoppingCart.length);
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

    this.dataAccessService.createNewUser(final_data).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        const serverReply: string[] = response.json();
        this.serverReply = serverReply[0];
        this.openModal(this.userCreated);
      }
    });

  }

  onLogin(form: HTMLFormElement) {
    let final_data;

    final_data = {login: form.value.login, password: form.value.password};

    this.dataAccessService.login(final_data);
    this.modalService.dismissAll();
  }

  openModal(addUserModal) {
    this.modalService.open(addUserModal, {size: 'lg'});
  }

  addPhoto(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }
}
