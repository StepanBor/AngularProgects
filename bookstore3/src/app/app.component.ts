import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('sideMenu', [
      state('hideSide', style({
        'margin-left': '-250px',
        width: '250px',
        'margin-top': '10px'
      })),
      state('showSide', style({
        'margin-left': '2px',
        width: '250px',
        'margin-top': '10px'
      })),
      transition('showSide <=> hideSide', animate(500)),
    ])]
})
export class AppComponent {
  title = 'bookstore3';
  sideMenu = 'showSide';

  onSideMenuShow() {
    this.sideMenu = (this.sideMenu === 'showSide' ? 'hideSide' : 'showSide');
  }
}
