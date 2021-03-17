import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ClientLogin, ClientRegistration, ClientRegistration2} from '../../model/client';
import {Router} from '@angular/router';
import {
  faLock,
  faUser,
  faCalendarDay,
  faIdCard,
  faExclamationTriangle,
  faExclamationCircle,
  faUserCircle,
  faUnlock,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import {ClientService} from '../../services/client.service';
import {NgForm} from '@angular/forms';
import {getStringActual} from '../../model/RelojTest';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {AdminService} from '../../services/admin.service';

declare var $: any;

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  client: ClientRegistration;
  faLock = faLock;
  faUser = faUser;
  faCalendarDay = faCalendarDay;
  faIdCard = faIdCard;
  faExclamationTriangle = faExclamationTriangle;
  nameClient: string;
  lastName: string;
  birthdate: string;
  gender: string;
  email: string;
  password: string;
  passwordCon: string;
  errorMessage: string;
  faUnlock = faUnlock;

  actualDate: Date;
  btnOther: string;
  btnMasc: string;
  btnFemale: string;
  screenVerify: boolean;
  clientLog: ClientLogin;
  role: string;
  @ViewChild('formClient') formC: NgForm;

  clientA: ClientRegistration2;

  constructor(private notifyS: NotificationService, private authS: AuthService,
              private router: Router, private clientService: ClientService,
              private changeDetectorRef: ChangeDetectorRef, private datePipe: DatePipe, private adminS: AdminService) {
    this.btnOther = 'btnOther';
    this.btnMasc = 'btnMasc';
    this.btnFemale = 'btnFemale';
    this.actualDate = new Date();
    this.birthdate = this.datePipe.transform(this.getDateActual(), 'yyyy-MM-dd');
    this.gender = '';
    this.authS.roled.subscribe(roled => {
      this.role = roled;
    });
  }

  onSubmit(): void {

    const vBirth = this.birthdate.split('-');
    this.errorMessage = '';
    if (this.role != 'superAdmin') {
      this.client = {
        name: this.nameClient,
        lastname: this.lastName,
        birthdate: vBirth[2] + '-' + vBirth[1] + '-' + vBirth[0],
        gender: this.gender,
        e_mail: this.email,
        password: this.password
      };
      this.clientService.register(this.client).subscribe(() => {
          this.authS.inReg.next(true);
          this.clientLog = {
            password: this.password,
            e_mail: this.email
          };
          this.formC.reset();
          this.changeDetectorRef.detectChanges();
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
    else{
      this.clientA = {
        name: this.nameClient,
        lastname: this.lastName,
        birthdate: vBirth[2] + '-' + vBirth[1] + '-' + vBirth[0],
        gender: this.gender,
        e_mail: this.email
      };
      this.adminS.postUser(this.clientA).subscribe(() => {
        $('#register-client-modal').modal('hide');
        this.notifyS.succesRegisterClient();
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
      }, error => {
        this.errorMessage = error.error.message;
      });
    }
  }

  ngOnInit(): void {
    this.authS.reg.subscribe(reg => {
      this.screenVerify = reg;
    });
    $(document).ready(() => {
      $('#register-client-modal').on('show.bs.modal', () => {
        this.birthdate = this.datePipe.transform(this.getDateActual(), 'yyyy-MM-dd');
        this.nameClient = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.passwordCon = '';
        this.gender = '';
        this.errorMessage = '';

        if (document.getElementById(this.btnOther) != null) {
          document.getElementById(this.btnOther).style.backgroundColor = '#fafafa';
          document.getElementById(this.btnFemale).style.backgroundColor = '#fafafa';
          document.getElementById(this.btnMasc).style.backgroundColor = '#fafafa';
          document.getElementById(this.btnMasc).style.color = '#b6babd';
          document.getElementById(this.btnFemale).style.color = '#b6babd';
          document.getElementById(this.btnOther).style.color = '#b6babd';
        }
      });
      $('#register-client-modal').on('hidden.bs.modal', () => {
        this.authS.inReg.next(false);
        this.formC.reset();
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  redirect(): void {
    this.authS.login(this.clientLog).subscribe(() => {
      $('#register-client-modal').modal('hide');
      this.notifyS.sucessLogin();
      let role = '';
      this.authS.roled.subscribe(rol =>
        role = rol
      );
      if (role == 'superAdmin') {
        this.redirectAdmin();
      } else {
        this.redirect2();
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  isValidAll(): boolean {
    if (this.role == 'superAdmin' && this.ifBefore()) {
      return true;
    } else {
      return !this.isDifferentTo() && this.isValidPassLenght()
        && this.isEqual() && !this.contentSpaces()
        && this.contentDigits() && this.contentLower() && this.contentUpper() && this.ifBefore();
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

  changeButtoms(btnString: string): void {
    document.getElementById(btnString).style.color = '#ffffff';
    if (btnString === this.btnFemale) {
      this.gender = 'Mujer';
      document.getElementById(btnString).style.backgroundColor = '#fa8499';
      document.getElementById(this.btnOther).style.backgroundColor = '#fafafa';
      document.getElementById(this.btnOther).style.color = '#b6babd';
      document.getElementById(this.btnMasc).style.backgroundColor = '#fafafa';
      document.getElementById(this.btnMasc).style.color = '#b6babd';
    } else if (btnString === this.btnMasc) {
      this.gender = 'Hombre';
      document.getElementById(btnString).style.backgroundColor = '#9edcf6';
      document.getElementById(this.btnOther).style.backgroundColor = '#fafafa';
      document.getElementById(this.btnOther).style.color = '#b6babd';
      document.getElementById(this.btnFemale).style.backgroundColor = '#fafafa';
      document.getElementById(this.btnFemale).style.color = '#b6babd';
    } else {
      this.gender = 'Otro';
      document.getElementById(btnString).style.backgroundColor = '#b6babd';
      document.getElementById(this.btnMasc).style.backgroundColor = '#fafafa';
      document.getElementById(this.btnMasc).style.color = '#b6babd';
      document.getElementById(this.btnFemale).style.backgroundColor = '#fafafa';
      document.getElementById(this.btnFemale).style.color = '#b6babd';
    }
  }

  getDateActual(): string {
    return getStringActual();
  }

  ifBefore(): boolean {
    const birtDateD = new Date(this.birthdate);
    birtDateD.setDate(birtDateD.getDate() + 1);
    return birtDateD < this.actualDate;
  }

  redirect2(): void {
    this.router.navigate(['']);

  }

  redirectAdmin(): void {
    this.router.navigate(['admin/dashboard']);
  }

}

