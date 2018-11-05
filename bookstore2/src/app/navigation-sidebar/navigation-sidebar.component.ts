import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.css']
})
export class NavigationSidebarComponent implements OnInit {

  serverURL = environment.serverURL;

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
