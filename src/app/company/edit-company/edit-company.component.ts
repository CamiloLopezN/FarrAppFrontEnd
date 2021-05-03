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
  errorMessageEmail: string;
  errorMessageNIT: string;
  errorMessageName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyS: CompanyService,
    private authService: AuthService,
    private ns: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getCompany();
  }

  save(): void {
    this.errorMessageEmail = '';
    this.errorMessageNIT = '';
    this.errorMessageName = '';
    this.companyS.editCompany(this.company).subscribe(() => {
      this.router.navigate(['/company/profile']);
      this.ns.sucessEditCompany();
    }, error => {
      if (error.status !== 403) {
        if (error.error.message === 'Ya existe una empresa registrada con ese identificador de NIT') {
          this.errorMessageNIT = error.error.message;
        } else if (error.error.message === 'Ya existe una empresa registrada con ese nombre') {
          this.errorMessageName = error.error.message;
        } else {
          this.errorMessageEmail = error.error.message;
        }
      } else {
        this.authService.logoutExpired();
      }
    });

  }

  private getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = {
          nit: res.nit,
          contactNumber: res.contact_number,
          address: res.address,
          companyName: res.name,
          userId: res.user,
          events: res.events,
          establishments: res.establishments,
          _id: res.id
        };
      },
      () => {
        this.authService.logoutExpired();
      }
    );
  }

  isValidAll(): boolean {
    return this.isContactNumber() && this.isNameLenght() && this.isNit() && this.isAddress();
  }


  isNameLenght(): boolean {
    return this.company.companyName.length <= 150;
  }

  isAddress(): boolean {
    return this.company.address.length <= 150;
  }

  isContactNumber(): boolean {
    return this.company.contactNumber.length <= 50;
  }

  isNit(): boolean {
    return /^([0-9]{9}-[0-9])$/.test(this.company.nit.toString());
  }

}
