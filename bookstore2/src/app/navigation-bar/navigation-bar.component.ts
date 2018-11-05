import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DataAccessService} from '../data-access-services/data-access.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../data-models/User';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  serverURL = environment.serverURL;

  subscriptionLoggedUserChanged: Subscription;
  loggedUser: User;

  @Output() sidebarToggled = new EventEmitter<boolean>();
  navbarDropdownToggle: boolean;
  dropdownShow: string;
  files: any;

  serverReply = '';
  subscriptionServerReply: Subscription;
  submitOrderReply = '';
  confirmPasswordProp = '';
  login = true;
  @ViewChild('userCreated') userCreated;

  // sidebarToggle: boolean;

  constructor(private dataAccessService: DataAccessService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.subscriptionServerReply = this.dataAccessService.serverReplyChanged.subscribe((response) => {
      this.serverReply = response;
      if (this.serverReply !== 'wrong login or password') {
        this.modalService.dismissAll();
        this.openModal(this.userCreated);
      }
    });
    this.subscriptionLoggedUserChanged = this.dataAccessService.loggedUserChanged
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.dropdownShow = '';
    this.navbarDropdownToggle = false;
    // this.sidebarToggle = false;
  }

  onnavbarDropdownToggle() {
    this.navbarDropdownToggle = !this.navbarDropdownToggle;
    if (this.navbarDropdownToggle) {
      this.dropdownShow = 'show';
    } else {
      this.dropdownShow = '';
    }

  }

  onSidebarToggle() {
    // this.sidebarToggle = !this.sidebarToggle;
    this.sidebarToggled.emit();
  }

  onLogin(form: HTMLFormElement) {
    let final_data;

    final_data = {login: form.value.login, password: form.value.password};

    this.dataAccessService.login(final_data);

    // this.modalService.dismissAll();

  }

  logout() {
    this.dataAccessService.logout();
    this.router.navigate(['/loginPage']);
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
    formData.append('userRole', form.value.userRole);
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

  addPhoto(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  openModal(addUserModal) {
    this.modalService.open(addUserModal, {size: 'lg'});
  }

  openAddUserModal(addUserModal) {
    if (this.login) {
      this.modalService.open(addUserModal);
    } else {
      this.modalService.open(addUserModal, {size: 'lg'});
    }

  }

}
