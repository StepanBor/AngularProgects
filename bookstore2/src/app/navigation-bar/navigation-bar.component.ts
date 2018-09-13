import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Output() sidebarToggled = new EventEmitter<boolean>();
  navbarDropdownToggle: boolean;
  dropdownShow: string;
  // sidebarToggle: boolean;

  constructor() {
  }

  ngOnInit() {
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


}
