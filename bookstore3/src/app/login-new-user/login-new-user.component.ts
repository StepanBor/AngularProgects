import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DataAccessService} from '../data-access-services/data-access.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-new-user',
  templateUrl: './login-new-user.component.html',
  styleUrls: ['./login-new-user.component.css']
})
export class LoginNewUserComponent implements OnInit, OnChanges {

  @ViewChild('userCreated') userCreated;
  files: any;
  createUserReply = '';
  confirmPasswordProp = '';
  @Input() login = true;

  constructor(private dataAccessService: DataAccessService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    // this.login = true;

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);
  }


  onSubmitUser(form: HTMLFormElement) {
    console.log(form);
    // let final_data;
    // // let newUserData: string[];
    // const formData = new FormData();
    // if (this.files != null) {
    //   const files: FileList = this.files;
    //   for (let i = 0; i < files.length; i++) {
    //     formData.append('photo', files[i]);
    //   }
    // }
    // formData.append('login', form.value.login);
    // formData.append('email', form.value.email);
    // formData.append('phone', form.value.phone);
    // formData.append('address', form.value.address);
    // formData.append('name', form.value.name);
    // formData.append('lastname', form.value.lastname);
    // formData.append('password', form.value.password);
    //
    // final_data = formData;
    // // } else {
    // //   // Если нет файла, то слать как обычный JSON
    // //   final_data = form.value;
    // // }
    //
    // this.dataAccessService.createNewUser(final_data).subscribe((response) => {
    //   console.log(response);
    //   if (response.status === 200) {
    //     const serverReply: string[] = response.json();
    //     this.serverReply = serverReply[0];
    //     this.openModal(this.userCreated);
    //   }
    // });

  }

  openModal(addUserModal) {
    this.modalService.open(addUserModal, {size: 'lg'});
  }


  addPhoto(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }
}
