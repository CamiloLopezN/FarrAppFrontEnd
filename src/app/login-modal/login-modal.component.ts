import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {faUserCircle, faLock, faExclamationTriangle, faUnlock, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {ClientLogin} from '../model/client';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';
import {NgForm} from '@angular/forms';


declare var $: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  faUserCircle = faUserCircle;
  faLock = faLock;
  faExclamationTriangle = faExclamationTriangle;
  faUnlock = faUnlock;
  faChevronLeft = faChevronLeft;
  client: ClientLogin;
  // tslint:disable-next-line:variable-name
  e_mail = '';
  password = '';
  isPass = true;
  isUserMail = true;
  emailRetrieve: string;
  error: string;
  isError: boolean;
  rol;

  isLogin: boolean;
  errorMessage: string;


  @ViewChild('formUser') formRecipe: NgForm;

  constructor(
    private router: Router,
    public authService: AuthService,
    private notifyS: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.authService.isLog.subscribe(login => {
      this.isLogin = login;
    });

    $(document).ready(() => {
      $('#login-modal').on('show.bs.modal', () => {
        this.emailRetrieve = '';
        this.password = '';
        this.e_mail = '';
        this.formRecipe.reset();
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  onSubmit(): void {
    this.client = {
      e_mail: this.e_mail,
      password: this.password
    };
    this.errorMessage = '';
    this.authService.login(this.client).subscribe(() => {
        this.isPass = true;
        this.isUserMail = true;
        $('#login-modal').modal('hide');
        this.formRecipe.reset();
        this.changeDetectorRef.detectChanges();
        this.notifyS.sucessLogin();
        this.authService.roled.subscribe(rol =>
          this.rol = rol
        );
        if (this.rol === 'superAdmin') {
          this.redirectAdmin();
        } else if (this.rol === 'company'){
          this.redirectCompany();
        } else {
          this.redirect();
        }
        this.formRecipe.reset();
        this.changeDetectorRef.detectChanges();
      },
      error => {
        this.errorMessage = error.error.message;
        if (this.errorMessage === '"e_mail" must be a valid email') {
          this.errorMessage = 'Debes ingresar un e-mail válido';
        }
        if (this.errorMessage === 'Error la contraseña es incorrecta') {
          this.isUserMail = true;
          this.isPass = false;
        } else {
          this.isUserMail = false;
          this.isPass = true;
        }
      }
    );
  }

  isUndefined(): boolean {
    return this.errorMessage === undefined;
  }

  isEmpty(): boolean {
    return this.password === '';
  }

  isPassOk(): boolean {
    return this.password === 'hola';
  }

  redirect(): void {
    this.router.navigate(['']);
  }

  redirectCompany(): void {
    this.router.navigate(['company/landing-page']);
  }

  redirectAdmin(): void {
    this.router.navigate(['admin/dashboard']);

  }

  retrievePass(): void {
    this.authService.retrievePass(this.emailRetrieve).subscribe(() => {
      this.notifyS.sucessRetreivePass();
    }, error => {
      this.error = error.error.message;
    });
  }
}
