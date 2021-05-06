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
  faUsers = faUsers;
  p: number;
  total: number;
  itemsPerP: number;
  companySelected: string;

  constructor(private adminS: AdminService, private authS: AuthService, private route: Router) {
    this.companies = [];
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companySelected = 'a';
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, true).subscribe(res => {
      console.log(res);
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  profile(id: string): void {
    this.route.navigate([`admin/company/${id}`]);
  }

  getCompaniesD(): void {
    this.companySelected = 'd';
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, false, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getCompaniesPT(): void {
    this.companySelected = 'pt';
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, true, true, true).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getCompaniesP(): void {
    this.companySelected = 'p';
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, false, false, true).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getCompaniesV(): void {
    this.companySelected = 'v';
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  pageChange($event: number): void {
    this.p = $event;
    if (this.companySelected === 'a') {
      this.getCompanies();
    } else if (this.companySelected === 'd') {
      this.getCompaniesD();
    } else if (this.companySelected === 'p') {
      this.getCompaniesP();
    } else if (this.companySelected === 'v') {
      this.getCompaniesV();
    }else{
      this.getCompaniesPT();
    }
  }

}
