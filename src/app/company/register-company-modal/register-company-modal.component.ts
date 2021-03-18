import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ClientRegistration2} from '../../model/client';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
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
  errorMessageEmail: string;
  errorMessageNIT: string;
  errorMessageName: string;
  faUnlock = faUnlock;

  screenVerify: boolean;

  role: string;
  @ViewChild('formClient') formC: NgForm;

  clientA: ClientRegistration2;

  constructor(private notifyS: NotificationService, private authS: AuthService,
              private router: Router, private companyService: CompanyService,
              private changeDetectorRef: ChangeDetectorRef, private adminS: AdminService) {
    this.authS.roled.subscribe(roled => {
      this.role = roled;
    });
    this.password = '';
  }


  ngOnInit(): void {
    this.authS.regComp.subscribe(reg => {
      this.screenVerify = reg;
    });
    $(document).ready(() => {
      $('#register-company-modal').on('show.bs.modal', () => {
        this.email = '';
        this.password = '';
        this.passwordCon = '';
        this.errorMessageEmail = '';
        this.errorMessageNIT = '';
        this.errorMessageName = '';
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

    this.errorMessageEmail = '';
    this.errorMessageNIT = '';
    this.errorMessageName = '';
    // tslint:disable-next-line:triple-equals
    if (this.role != 'superAdmin') {
      this.company = {
        name: this.name,
        address: this.address,
        contact_number: this.contactNumber,
        e_mail: this.email,
        password: this.password,
        nit: this.nit
      };
      this.companyService.register(this.company).subscribe(() => {
          this.authS.inRegCompany.next(true);
          this.formC.reset();
          this.changeDetectorRef.detectChanges();
        },
        error => {
          if (error.error.message == 'Ya existe una empresa registrada con ese identificador de NIT') {
            this.errorMessageNIT = error.error.message;
          } else if (error.error.message == 'Ya existe una empresa registrada con ese nombre') {
            this.errorMessageName = error.error.message;
          } else {
            this.errorMessageEmail = error.error.message;
          }
        }
      );
    } else {
      this.companyA = {
        nit: this.nit,
        name: this.name,
        e_mail: this.email,
        contact_number: this.contactNumber,
        address: this.address
      };
      this.adminS.postCompany(this.companyA).subscribe(() => {
        $('#register-company-modal').modal('hide');
        this.notifyS.succesRegisterCompany();
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
      }, error => {
        if (error.error.message == 'Ya existe una empresa registrada con ese identificador de NIT') {
          this.errorMessageNIT = error.error.message;
        } else if (error.error.message == 'Ya existe una empresa registrada con ese nombre') {
          this.errorMessageName = error.error.message;
        } else {
          this.errorMessageEmail = error.error.message;
        }
      });
    }
  }

  isValidAll(): boolean {
    if (this.role == 'superAdmin') {
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
    if (this.name != undefined) {
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
