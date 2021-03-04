import {Component, OnInit} from '@angular/core';
import {CompanyResponseAdmin2} from '../../model/comapany';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  company: CompanyResponseAdmin2;
  isActive: boolean;
  isReq: boolean;
  e_mail: string;

  constructor(
    private ns: NotificationService,
    private _route: ActivatedRoute,
    private adminS: AdminService,
    private authS: AuthService,
    private _router: Router) {
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
          this.isReq = res.company[0].user.reqDesactive;
          this.e_mail = res.company[0].user.e_mail;
          this.company._id = res.company[0].id_user;
        },
        this.authS.logoutExpired);
    });
  }

  active(): void {
    this.adminS.activeCompany(this.company._id, true, false).subscribe(() => {
      this._router.navigate(['/admin/company']);
      this.ns.sucessActivateCompany();
    }, () => {
      this.authS.logoutExpired();
    });
  }

  desactive(): void {
    this.adminS.activeCompany(this.company._id, false, true).subscribe(() => {
      this._router.navigate(['/admin/company']);
      this.ns.sucessDesactivateCompany();
    }, () => {
      this.authS.logoutExpired();
    });
  }
}
