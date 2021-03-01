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

  save() {

  }

  private getCompany(): void {
    this.company = {
      nit: '4564115-9',
      name: 'La Pacha',
      contact_number: '3554987897',
      address: 'Dirección Enrique Segoviano'
    };
  }

  return() {
    this._router.navigate(['/company']);
  }
}
