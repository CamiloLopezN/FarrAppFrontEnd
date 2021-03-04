import {Component, OnInit} from '@angular/core';
import {CompanyResponse} from '../../model/company';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  public company: CompanyResponse;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private companyS: CompanyService,
    private authService: AuthService,
    private ns: NotificationService
  ) {
    this.company = {
      nit: '',
      contact_number: '',
      address: '',
      name: ''
    };
  }

  ngOnInit(): void {
    this.getCompany();
  }

  save(): void {
    this.companyS.editCompany(this.company).subscribe(() => {
      this._router.navigate(['/company/profile']);
      this.ns.sucessEditCompany();
    }, () => {
      this.authService.logoutExpired();
    });

  }

  private getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = {
          nit: res.nit,
          contact_number: res.contact_number,
          address: res.address,
          name: res.name
        };
      },
      () => {
        this.authService.logoutExpired();
      }
    );
  }
}
