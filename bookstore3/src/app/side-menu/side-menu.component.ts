import {Component, OnInit} from '@angular/core';
import {DataAccessService} from '../data-access-services/data-access.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  animations: [
    trigger('categories', [
      state('hideCat', style({
        height: '0px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis'
      })),
      state('showCat', style({})),
      transition('showCat <=> hideCat', animate(500)),
    ]),
    trigger('authors', [
      state('hideAut', style({
        height: '0px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis'
      })),
      state('showAut', style({})),
      transition('showAut <=> hideAut', animate(500)),
    ]),
    trigger('publishers', [
      state('hidePub', style({
        height: '0px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis'
      })),
      state('showPub', style({})),
      transition('showPub <=> hidePub', animate(500)),
    ])
  ]
})
export class SideMenuComponent implements OnInit {

  bookParams = [];

  categories: string;
  authors: string;
  publishers: string;


  constructor(private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    this.dataAccessService.getBookParameters().subscribe((response) => {
      const data = response.json();
      this.bookParams = data;
      // console.log(this.bookParams[0] + 'WWWWWWWWWWWW');
    });

    this.categories = 'hideCat';
    this.authors = 'hideAut';
    this.publishers = 'hidePub';

  }

}
