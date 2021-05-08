import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {EstablishmentView, EventView} from '../../model/company';
import {faBuilding, faCalendarCheck, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

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

  constructor(private clientS: ClientService, private authS: AuthService, private notifyS: NotificationService) {

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
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

}
