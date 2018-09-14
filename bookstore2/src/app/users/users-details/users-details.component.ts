import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../data-models/User';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  @Input() activeUserDetails: User;
  

  constructor() {
  }

  ngOnInit() {

    this.activeUserDetails = new User(0, '', '', '', '', '', '',
      '', '', '');
  }

}
