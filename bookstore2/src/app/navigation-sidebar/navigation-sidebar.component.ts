import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.css']
})
export class NavigationSidebarComponent implements OnInit {

  @Input() isSidebarOnSidebar: boolean;

  constructor() {
  }

  ngOnInit() {

    this.isSidebarOnSidebar = false;

  }


}
