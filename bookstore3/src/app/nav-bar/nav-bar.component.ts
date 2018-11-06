import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DataAccessService} from '../data-access-services/data-access.service';
import {BookItem} from '../data-models/BookItem';
import {ItemEntry} from '../data-models/ItemEntry';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../data-models/User';
import {Order} from '../data-models/Order';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  serverURL = environment.serverURL;

  @Output() sideBarTogle = new EventEmitter<boolean>();

  subscriptionShoppingCartSum: Subscription;
  subscriptionLoggedUserChanged: Subscription;
  subscriptionLoggedUserOrdersChanged: Subscription;

  shoppingCartSum: number;

  shoppingCart: ItemEntry[];

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
    this.shoppingCart = this.dataAccessService.shoppingCart;
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
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  goToCabinet() {
    this.router.navigate(['userCabinet']);
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

  openAddUserModal(addUserModal) {
    if (this.login) {
      this.modalService.open(addUserModal);
    } else {
      this.modalService.open(addUserModal, {size: 'lg'});
    }

  }

  goToAdminPage(){
    this.dataAccessService.goToAdminPage();
  }

  logout() {
    this.dataAccessService.logout();
    this.router.navigate(['/']);
  }
}
