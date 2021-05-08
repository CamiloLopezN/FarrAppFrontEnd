import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {CompanyResponseAdmin} from '../../model/company';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

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

  constructor(private adminS: AdminService, private authS: AuthService, private route: Router, private notifyS: NotificationService) {
    this.itemsPerP = 6;
    this.companies = [];
  }

  ngOnInit(): void {
    this.getCompanies(true);
  }

  getCompanies(isChange: boolean): void {
    this.companySelected = 'a';
    this.p = isChange ? 1 : this.p;
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, true).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  profile(id: string): void {
    this.route.navigate([`admin/company/${id}`]);
  }

  getCompaniesD(isChange: boolean): void {
    this.companySelected = 'd';
    this.p = isChange ? 1 : this.p;
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, false, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  getCompaniesPT(isChange: boolean): void {
    this.companySelected = 'pt';
    this.p = isChange ? 1 : this.p;
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, true, true, true).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  getCompaniesP(isChange: boolean): void {
    this.companySelected = 'p';
    this.p = isChange ? 1 : this.p;
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, false, false, true).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  getCompaniesV(isChange: boolean): void {
    this.companySelected = 'v';
    this.p = isChange ? 1 : this.p;
    this.adminS.getCompanies(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.companies = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  pageChange($event: number): void {
    this.p = $event;
    if (this.companySelected === 'a') {
      this.getCompanies(false);
    } else if (this.companySelected === 'd') {
      this.getCompaniesD(false);
    } else if (this.companySelected === 'p') {
      this.getCompaniesP(false);
    } else if (this.companySelected === 'v') {
      this.getCompaniesV(false);
    }else{
      this.getCompaniesPT(false);
    }
  }

}
