import {Component, OnInit} from '@angular/core';
import {CompanyResponse} from '../../model/company';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';
import {faExclamationTriangle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

  public company: CompanyResponse;
  faExclamationTriangle = faExclamationTriangle;
  faInfoCard = faInfoCircle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyS: CompanyService,
    private authS: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getCompany();
  }

  removeCompany(): void {
    this.companyS.removeUser().subscribe(() => {
        this.authS.logoutSessionDesact();
      },
      () => {
        this.authS.logoutExpired();
      });
  }

  edit(): void {
    this.router.navigate(['company/edit']);
  }

  private getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res.message;
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }
}
