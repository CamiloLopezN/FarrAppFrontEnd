import {Component, OnInit} from '@angular/core';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {EventView} from '../../../model/company';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';
import {AuthService} from '../../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-events-user',
  templateUrl: './events-user.component.html',
  styleUrls: ['./events-user.component.css']
})
export class EventsUserComponent implements OnInit {

  faSlider = faSlidersH;
  events: EventView[];

  constructor(private userS: UserService, private ns: NotificationService, private authS: AuthService) {
  }


  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.userS.getEvents().subscribe(res => {
      this.events = res[0].data.map(event => event.events);
      this.events.forEach(ev => {
        ev.start = new Date(ev.start);
        ev.end = new Date(ev.end);
      });
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    }, () => {
      $(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
    });
  }

}
