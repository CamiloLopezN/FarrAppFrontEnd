import {Component} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {IsShowModalService} from './services/is-show-modal.service';
import {CitiesService} from './services/cities.service';

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
  cities: string[];

  constructor(shms: IsShowModalService, private cs: CitiesService) {
    shms.event.subscribe(est => {
      this.isEvent = est;
    });
    shms.establishment.subscribe(est => {
      this.isEstablishment = est;
    });
    this.cs.getCities().subscribe(res => {
      this.cities = res.find(obj => obj.departamento === 'Boyacá').ciudades;
    });
  }
}
