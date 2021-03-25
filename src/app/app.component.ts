import {Component} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {IsShowModalService} from './services/is-show-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'farrap-frontend';
  faCoffee = faCoffee;
  isEvent: boolean;
  isEstablishment: boolean;

  constructor(shms: IsShowModalService) {
    shms.event.subscribe(est => {
      this.isEvent = est;
    });
    shms.establishment.subscribe(est => {
      this.isEstablishment = est;
    });
  }
}
