import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {CompanyResponseAdmin} from '../../model/company';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-companies-admin',
  templateUrl: './companies-admin.component.html',
  styleUrls: ['./companies-admin.component.css']
})
export class CompaniesAdminComponent implements OnInit {

  companies: CompanyResponseAdmin[];
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
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.adminS.getCompanies().subscribe(res => {
      this.companies = [];
      for (const company of res) {
        if (company.user.active && !company.user.req_desactive) {
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
    this.adminS.getCompanies().subscribe(res => {
      this.companies = [];
      for (const company of res) {
        if (!company.user.active && !company.user.req_desactive) {
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

  profile(_id: string): void {
    this.route.navigate([`admin/company/${_id}`]);
  }

  getCompaniesD(): void {
    this.adminS.getCompanies().subscribe(res => {
      this.companies = [];
      for (const company of res) {
        if (!company.user.active && company.user.req_desactive) {
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

  getCompaniesPT(): void {
    this.adminS.getCompanies().subscribe(res => {
      this.companies = [];
      for (const company of res) {
        console.log(res);
        if (company.user.active && company.user.req_desactive) {
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
}
