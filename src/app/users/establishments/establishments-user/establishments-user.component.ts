import { Component, OnInit } from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-establishments-user',
  templateUrl: './establishments-user.component.html',
  styleUrls: ['./establishments-user.component.css']
})
export class EstablishmentsUserComponent implements OnInit {

  establishments: EstablishmentView[];

  constructor(private userS: UserService, private ns: NotificationService, private authS: AuthService) {
  }


  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments(): void {
    this.userS.getEstablishments().subscribe(res => {
      this.establishments = res[0].data.map(establishment => establishment.establishments);
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

}
