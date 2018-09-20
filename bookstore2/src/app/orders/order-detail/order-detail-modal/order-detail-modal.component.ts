import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.css']
})
export class OrderDetailModalComponent implements OnInit {

  @Input() isModalShow: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isModalShow = false;
  }



}
