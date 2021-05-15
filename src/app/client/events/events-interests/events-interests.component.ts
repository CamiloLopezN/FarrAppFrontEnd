import {Component, OnInit} from '@angular/core';
import {EventView} from '../../../model/company';
import {ClientService} from '../../../services/client.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-events-interests',
  templateUrl: './events-interests.component.html',
  styleUrls: ['./events-interests.component.css']
})
export class EventsInterestsComponent implements OnInit {


  events: EventView[];

  constructor(private clientS: ClientService, private router: Router, private authS: AuthService, private notifyS: NotificationService) {
    this.events = [];
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.clientS.getUser().subscribe(res => {
      this.events = res.message.interests;
      if (this.events.length === 0) {
        this.router.navigate(['/client/landing-page']);
      }
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

}
