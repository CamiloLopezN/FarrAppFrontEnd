import {Component, OnInit} from '@angular/core';
import {CompanyResponseAdmin2} from '../../model/company';

import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {SpinnerService} from '../../services/spinner.service';

declare var $: any;

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  company: CompanyResponseAdmin2;
  isActive: boolean;
  isReq: boolean;

  constructor(
    private ns: NotificationService,
    private route: ActivatedRoute,
    private adminS: AdminService,
    private authS: AuthService,
    public loaderService: SpinnerService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getCompany();
  }

  private getCompany(): void {
    const id = this.route.snapshot.params.id;
    this.adminS.getCompanyById(id).subscribe(res => {
        this.company = res;
      },
      this.authS.logoutExpired, () => {
        $(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
      });
  }

  active(): void {
    this.adminS.changeStatus(true, false, true, this.company.userId._id).subscribe(() => {
      this.router.navigate(['/admin/company']);
      this.ns.sucessActivateCompany();
    }, () => {
      this.authS.logoutExpired();
    });
  }

  desactive(): void {
    this.adminS.changeStatus(false, false, false, this.company.userId._id).subscribe(() => {
      this.router.navigate(['/admin/company']);
      this.ns.sucessDesactivateCompany();
    }, () => {
      this.authS.logoutExpired();
    });
  }
}
