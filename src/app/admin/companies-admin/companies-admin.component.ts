import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {AdminService} from '../../services/admin.service';
import {ClientResponseAdmin} from '../../model/client';
import {CompanyResponseAdmin} from '../../model/comapany';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-companies-admin',
  templateUrl: './companies-admin.component.html',
  styleUrls: ['./companies-admin.component.css']
})
export class CompaniesAdminComponent implements OnInit {

  companies: CompanyResponseAdmin[];
  companiesP: CompanyResponseAdmin[];
  company: CompanyResponseAdmin;
  faUsers = faUsers;
  p: number;

  constructor(private adminS: AdminService, private authS: AuthService, private route: Router) {
    this.company = {
      _id: '',
      name: '',
      nit: ''
    };
    this.companies = [];
    this.companiesP = [];
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.adminS.getCompanies().subscribe(res => {
      this.companies = [];
      for (const company of res) {
        if (company.user.active) {
          this.company = {
            _id: company._id,
            name: company.name,
            nit: company.nit
          };
          this.companies.push(this.company);
        }
      }
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getCompaniesP(): void {
    this.adminS.getCompaniesP().subscribe(res => {
      this.companiesP = [];
      for (const company of res) {
        this.company = {
          _id: company._id,
          name: company.name,
          nit: company.nit
        };
        this.companiesP.push(this.company);
      }
    }, () => {
      this.authS.logoutExpired();
    });
  }

  profile(_id: string): void {
    this.route.navigate([`admin/company/${_id}`]);
  }
}
