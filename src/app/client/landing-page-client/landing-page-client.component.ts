import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {EstablishmentView, EventView} from '../../model/company';
import {faBuilding, faCalendarCheck, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page-client',
  templateUrl: './landing-page-client.component.html',
  styleUrls: ['./landing-page-client.component.css']
})
export class LandingPageClientComponent implements OnInit {

  client: any;
  events: EventView[];
  establishments: EstablishmentView[];

  faCalendar = faCalendarCheck;
  faBuilding = faBuilding;
  faUser = faUser;

  constructor(private clientS: ClientService) {

  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.clientS.getUser().subscribe(res => {
      this.client = res.message;
      this.events = res.message.interests.filter(inter => inter.status === 'Activo');
      this.establishments = res.message.follows;
    }, error => {
      console.log(error);
    });
  }

}
