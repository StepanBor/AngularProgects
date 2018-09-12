import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  navbarDropdownToggle: boolean;
  dropdownShow: string;

  constructor() {
  }

  ngOnInit() {
    this.dropdownShow = '';
    this.navbarDropdownToggle = false;
  }

  onnavbarDropdownToggle() {
    this.navbarDropdownToggle = !this.navbarDropdownToggle;
    if (this.navbarDropdownToggle) {
      this.dropdownShow = 'show';
    } else {
      this.dropdownShow = '';
    }

  }


}
