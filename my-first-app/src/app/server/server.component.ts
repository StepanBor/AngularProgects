import {Component} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  title2 = 'serverTitle';
  id = 15;
  serverName = 'server name 1';

  getServerName() {
    return this.serverName;
  }
}
