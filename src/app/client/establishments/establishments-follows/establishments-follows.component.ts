import {Component, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {ClientService} from '../../../services/client.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-establishments-follows',
  templateUrl: './establishments-follows.component.html',
  styleUrls: ['./establishments-follows.component.css']
})
export class EstablishmentsFollowsComponent implements OnInit {

  establishments: EstablishmentView[];

  constructor(private clientS: ClientService, private router: Router, private authS: AuthService, private notifyS: NotificationService) {
    this.establishments = [];
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.clientS.getUser().subscribe(res => {
      this.establishments = res.message.follows;
      if (this.establishments.length === 0) {
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
