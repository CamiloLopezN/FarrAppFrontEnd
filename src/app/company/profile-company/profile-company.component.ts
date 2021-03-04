import {Component, OnInit} from '@angular/core';
import {CompanyResponse} from '../../model/company';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

  public company: CompanyResponse;
  private _id: string;
  faExclamationTriangle = faExclamationTriangle;

  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    private companyS: CompanyService,
    private authS: AuthService
  ) {
    this.company = {
      address: '',
      contact_number: '',
      name: '',
      nit: ''
    };
  }

  ngOnInit(): void {
    this.getCompany();
  }

  removeCompany() {
    this.companyS.removeUser().subscribe(() => {
        this.authS.logoutSessionDesact();
      },
      () => {
        this.authS.logoutExpired();
      });
  }

  edit(): void {
    this._router.navigate(['company/edit']);
  }

  private getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res;
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }
}
