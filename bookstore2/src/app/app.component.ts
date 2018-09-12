import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookstore2';
  isSidebarOn = false;

  onSidebarOn() {
    this.isSidebarOn = !this.isSidebarOn;
  }


}
