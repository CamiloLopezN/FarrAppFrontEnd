import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ClientRegistration2} from '../../model/client';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {
  faLock,
  faUnlock,
  faBuilding,
  faLocationArrow,
  faAt,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import {faSlideshare} from '@fortawesome/free-brands-svg-icons';
import {CompanyRegistration, CompanyRegistration2} from '../../model/company';
import {CompanyService} from '../../services/company.service';
import {SpinnerService} from '../../services/spinner.service';

declare var $: any;

@Component({
  selector: 'app-register-company-modal',
  templateUrl: './register-company-modal.component.html',
  styleUrls: ['./register-company-modal.component.css']
})

export class RegisterCompanyModalComponent implements OnInit {

  faLock = faLock;
  faBuilding = faBuilding;
  faLocationArrow = faLocationArrow;
  faAt = faAt;
  faPhone = faPhone;
  faSlideshare = faSlideshare;

  company: CompanyRegistration;
  companyA: CompanyRegistration2;

  name: string;
  address: string;
  contactNumber: string;
  nit: string;

  email: string;
  password: string;
  passwordCon: string;
  errorMessage: string;
  faUnlock = faUnlock;

  screenVerify: boolean;

  role: string;
  @ViewChild('formClient') formC: NgForm;

  clientA: ClientRegistration2;

  constructor(private notifyS: NotificationService, private authS: AuthService,
              private router: Router, private companyService: CompanyService,
              private changeDetectorRef: ChangeDetectorRef, public loaderService: SpinnerService) {
    this.authS.roled.subscribe(roled => {
      this.role = roled;
    });
    this.authS.regComp.subscribe(reg => {
      this.screenVerify = reg;
    });
    this.password = '';
  }


  ngOnInit(): void {
    $(document).ready(() => {
      $('#register-company-modal').on('show.bs.modal', () => {
        this.email = '';
        this.password = '';
        this.passwordCon = '';
        this.errorMessage = '';
        this.nit = '';
        this.contactNumber = '';
        this.name = '';
        this.address = '';
        this.authS.inRegCompany.next(false);
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  onSubmit(): void {

    this.errorMessage = '';
    // tslint:disable-next-line:triple-equals
    if (this.role != 'admin') {
      this.company = {
        companyName: this.name,
        address: this.address,
        contactNumber: this.contactNumber,
        email: this.email,
        password: this.password,
        nit: this.nit
      };
      this.companyService.register(this.company, false).subscribe(() => {
          this.authS.inRegCompany.next(true);
          this.formC.reset();
          this.changeDetectorRef.detectChanges();
        },
        error => {
          if (error.status === 400) {
            this.errorMessage = 'Nombre o nit ya se encuentra registrado.';
          } else if (error.status === 500) {
            this.errorMessage = 'Error en el servidor, intente más tarde';
          }
        }
      );
    } else {
      this.companyA = {
        nit: this.nit,
        companyName: this.name,
        email: this.email,
        contactNumber: this.contactNumber,
        address: this.address
      };
      this.companyService.register(this.companyA, true).subscribe(() => {
        $('#register-company-modal').modal('hide');
        this.notifyS.succesRegisterCompany();
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
      }, error => {
        if (error.status === 400) {
          this.errorMessage = 'Nombre o nit ya se encuentra registrado.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error en el servidor, intente más tarde';
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      });
    }
  }

  isValidAll(): boolean {
    if (this.role === 'admin') {
      return this.isNameLenght() && this.isNit() && this.isAddress() && this.isContactNumber() && this.isEmailLength();
    } else {
      return !this.isDifferentTo() && this.isValidPassLenght()
        && this.isEqual() && !this.contentSpaces()
        && this.contentDigits() && this.contentLower() &&
        this.isContactNumber() && this.contentUpper() && this.isNameLenght() && this.isNit() && this.isAddress() && this.isEmailLength();
    }
  }

  isEqual(): boolean {
    return this.password === this.passwordCon;
  }

  isDifferentTo(): boolean {
    return this.password === 'Passw0rd' || this.password === 'Password123';
  }

  isValidPassLenght(): boolean {
    return this.password.length >= 8 && this.password.length <= 100;
  }

  contentSpaces(): boolean {
    return /\s/.test(this.password.toString());
  }

  contentUpper(): boolean {
    return /[A-Z]/.test(this.password.toString());
  }

  contentLower(): boolean {
    return /[a-z]/.test(this.password.toString());
  }

  contentDigits(): boolean {
    return /^(?:\D*\d){2,100}\D*$/.test(this.password.toString());
  }

  isEmailLength(): boolean {
    return this.email.length <= 150;
  }

  isNameLenght(): boolean {
    if (this.name !== undefined) {
      return this.name.length <= 150;
    } else {
      return false;
    }
  }

  isAddress(): boolean {
    return this.address.length <= 150;
  }

  isContactNumber(): boolean {
    return this.contactNumber.length <= 50;
  }

  isNit(): boolean {
    return /^([0-9]{9}-[0-9])$/.test(this.nit.toString());
  }
}
