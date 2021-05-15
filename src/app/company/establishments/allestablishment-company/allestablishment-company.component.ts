import {Component, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {IsShowModalService} from '../../../services/is-show-modal.service';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';
import {CompanyService} from '../../../services/company.service';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-allestablishment-company',
  templateUrl: './allestablishment-company.component.html',
  styleUrls: ['./allestablishment-company.component.css']
})
export class AllestablishmentCompanyComponent implements OnInit {

  establishments: EstablishmentView[];
  faCalendarPlus = faBuilding;
  interest: number;

  constructor(private serviceShow: IsShowModalService, private companyS: CompanyService,
              private authS: AuthService, private ns: NotificationService) {
    this.establishments = [];
  }

  ngOnInit(): void {
    this.companyS.getEstablishment().subscribe((res) => {
        this.establishments = res.message.establishments;
        this.interest = this.establishments.map(a => a.followers).reduce((a, b) => {
          return a + b;
        }, 0);
      },
      error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }
    );
  }

  establishment(): void {
    this.serviceShow.isEstablishment.next(true);
    this.serviceShow.isEvent.next(false);
  }

}
