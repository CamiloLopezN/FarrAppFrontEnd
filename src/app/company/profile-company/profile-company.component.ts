import {Component, OnInit} from '@angular/core';
import {CompanyResponse} from '../../model/company';
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
    this.company = {
      nit: '4564115-9',
      name: 'La Pacha',
      contact_number: '3554987897',
      address: 'Dirección Enrique Segoviano'
    };
  }

  /*this.companyS.getCompany().subscribe((res) => {
      this.company = {
        nit: res.nit,
        name: res.name,
        contact_number: res.contact_number,
        address: res.address
      };
    },
    () => {
      this.authS.logoutExpired();
    }
  );
}*/
}
