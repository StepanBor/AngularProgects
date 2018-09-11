import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  static serverCounter = 0;
  allawNewServer = false;
  serverCreationStatus = ' no server vas created';
  serverName = 'Test two way binding';
  isServerCreated = false;

  constructor() {

    setTimeout(() => {
      this.allawNewServer = true;
    }, 2000);

  }

  ngOnInit() {
  }

  onServer2Creationw() {
    this.isServerCreated = true;
    ServersComponent.serverCounter++;
    this.serverCreationStatus = ServersComponent.serverCounter + ' servers was created';
  }

  onUpdateServeName(event: Event) {
    // console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
