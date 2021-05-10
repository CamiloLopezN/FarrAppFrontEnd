import {Component, OnInit} from '@angular/core';
import {CompanyResponse, EventView} from '../../model/company';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';
import {faExclamationTriangle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

  public company: CompanyResponse;
  faExclamationTriangle = faExclamationTriangle;
  faInfoCard = faInfoCircle;
  eventsActive: EventView[];
  attendees: number;
  isSubscribe: boolean;
  interested: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyS: CompanyService,
    private authS: AuthService,
    private userS: UserService,
    private ns: NotificationService
  ) {
    this.authS.subscribe.subscribe(res => {
      this.isSubscribe = res;
    });
  }

  ngOnInit(): void {
    this.getCompany();
  }

  removeCompany(): void {
    this.userS.removeUser().subscribe(() => {
        this.authS.logoutSessionDesact();
      },
      error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      });
  }

  edit(): void {
    this.router.navigate(['company/edit']);
  }

  getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res.message;
        this.eventsActive = this.company.events.filter(ev => ev.status === 'Activo');
        this.interested = this.eventsActive.map(a => a.interested).reduce((a, b) => {
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
}
