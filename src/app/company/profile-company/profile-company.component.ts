import {Component, OnInit} from '@angular/core';
import {CompanyResponse, EventView} from '../../model/company';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';
import {faExclamationTriangle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyS: CompanyService,
    private authS: AuthService,
    private userS: UserService
  ) {
  }

  ngOnInit(): void {
    this.getCompany();
  }

  removeCompany(): void {
    this.userS.removeUser().subscribe(() => {
        this.authS.logoutSessionDesact();
      },
      () => {
        this.authS.logoutExpired();
      });
  }

  edit(): void {
    this.router.navigate(['company/edit']);
  }

  getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res.message;
        console.log(res.message);
        this.eventsActive = this.company.events.filter(ev => ev.status === 'Activo');
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }
}
