import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.css']
})
export class NavigationSidebarComponent implements OnInit {

  @Input() isSidebarOnSidebar: boolean;

  activeSideMenuItem: number;

  constructor() {
  }

  ngOnInit() {

    this.isSidebarOnSidebar = false;
    this.activeSideMenuItem = 0;

  }

  setActiveSideMenuItem(num: number) {
    this.activeSideMenuItem = num;
  }

}
