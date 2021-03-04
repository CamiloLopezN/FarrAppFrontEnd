import {Component, OnInit} from '@angular/core';
import {CompanyResponse} from '../../model/comapany';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

  public company: CompanyResponse;

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
