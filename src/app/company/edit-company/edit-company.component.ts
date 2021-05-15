import {Component, OnInit} from '@angular/core';
import {CompanyResponse} from '../../model/company';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {CompanyService} from '../../services/company.service';
import {SpinnerService} from '../../services/spinner.service';
import {faAt, faLocationArrow, faBuilding, faLock, faPhone} from '@fortawesome/free-solid-svg-icons';
import {faSlideshare} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  public company: CompanyResponse;

  faLock = faLock;
  faBuilding = faBuilding;
  faLocationArrow = faLocationArrow;
  faAt = faAt;
  faPhone = faPhone;
  faSlideshare = faSlideshare;

  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyS: CompanyService,
    private authService: AuthService,
    private ns: NotificationService,
    public loaderService: SpinnerService
  ) {
  }

  ngOnInit(): void {
    this.getCompany();
  }

  save(): void {
    this.errorMessage = '';
    this.companyS.editCompany(this.company).subscribe(() => {
      this.router.navigate(['/company/profile']);
      this.ns.sucessEditCompany();
    }, error => {
      if (error.status === 400) {
        this.errorMessage = 'Nombre o nit ya se encuentra registrado.';
      } else if (error.status === 500) {
        this.errorMessage = 'Error en el servidor, intente más tarde';
      } else if (error.status === 401 || error.status === 403) {
          this.authService.logoutExpiredAndReload();
        }
    });

  }

  private getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res.message;
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
