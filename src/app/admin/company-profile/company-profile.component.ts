import {Component, OnInit} from '@angular/core';
import {CompanyResponseAdmin2} from '../../model/comapany';
import {ActivatedRoute, Params} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  company: CompanyResponseAdmin2;
  isActive: boolean;
  e_mail: string;

  constructor(private _route: ActivatedRoute, private adminS: AdminService, private authS: AuthService) {
    this.company = {
      _id: '',
      active: false,
      address: '',
      contact_number: '',
      name: '',
      nit: ''
    };
    this.e_mail = '';
  }

  ngOnInit(): void {
    this.getCompany();
  }

  private getCompany(): void {
    this._route.params.forEach((params: Params) => {
      const id = params.id;
      this.adminS.getCompanyById(id).subscribe(res => {

          this.company = res.company[0];
          this.isActive = res.company[0].user.active;
          this.e_mail = res.company[0].user.e_mail;
        },
        this.authS.logoutExpired);
    });
  }

  active(): void {

  }
}
