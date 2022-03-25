import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {faUserCircle, faLock, faExclamationTriangle, faUnlock, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {ClientLogin} from '../model/client';
import {ClientLoginWithFacebook} from '../model/client';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {SpinnerService} from '../services/spinner.service';
import {SocialAuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';


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
  clientFacebook: ClientLoginWithFacebook;
  // tslint:disable-next-line:variable-name
  e_mail = '';
  password = '';
  emailRetrieve: string;
  error: string;
  isError: boolean;
  rol;


  myForm: FormGroup;
  user: SocialUser;
  isSignedin: boolean = null;

  isLogin: boolean = null;
  errorMessage: string;
  isSub = false;


  @ViewChild('formUser') formRecipe: NgForm;

  constructor(
    private router: Router,
    public authService: AuthService,
    private notifyS: NotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    public loaderService: SpinnerService,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {
    this.authService.isLog.subscribe(login => {
      this.isLogin = login;
    });
    this.authService.roled.subscribe(rol =>
      this.rol = rol
    );
    this.authService.subscribe.subscribe(sub => {
      this.isSub = sub;
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    $('#login-modal').on('hidden.bs.modal', () => {
      if (this.rol === 'company' && !this.isSub) {

      }
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
      email: this.e_mail,
      password: this.password
    };
    this.errorMessage = '';
    this.authService.login(this.client).subscribe(() => {
      },
      error => {
        if (error.status === 403) {
          this.errorMessage = 'Primero debe verificar su correo';
        } else if (error.status === 401 || error.status === 400) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else if (error.status === 500) {
          this.errorMessage = 'Error en el servidor, intente más tarde';
        }
      }, () => {
        $('#login-modal').modal('hide');
        this.formRecipe.reset();
        this.changeDetectorRef.detectChanges();
        if (this.rol === 'admin') {
          this.notifyS.sucessLogin();
          this.redirectAdmin();
        } else if (this.rol === 'company') {
          this.notifyS.sucessLogin();
          this.redirectCompany();
        } else if (this.rol === 'client') {
          this.notifyS.sucessLogin();
          this.redirectClient();
        }
      }
    );
  }

  facebookLogIn(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.clientFacebook = {
        token: this.user.authToken,
        id: this.user.id
      };
      this.errorMessage = '';
      this.authService.loginWithFacebook(this.clientFacebook).subscribe(() => {
        },
        error => {
          if (error.status === 403) {
            this.errorMessage = 'Primero debe verificar su correo';
          } else if (error.status === 401 || error.status === 400) {
            this.errorMessage = 'Usuario o contraseña incorrectos';
          } else if (error.status === 500) {
            this.errorMessage = 'Error en el servidor, intente más tarde';
          }
        }, () => {
          $('#login-modal').modal('hide');
          this.formRecipe.reset();
          this.changeDetectorRef.detectChanges();
          if (this.rol === 'admin') {
            this.notifyS.sucessLogin();
            this.redirectAdmin();
          } else if (this.rol === 'company') {
            this.notifyS.sucessLogin();
            this.redirectCompany();
          } else if (this.rol === 'client') {
            this.notifyS.sucessLogin();
            this.redirectClient();
          }
        });
    });
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
    location.reload();
  }

  redirectCompany(): void {
    this.router.navigate(['company/landing-page']);
  }

  redirectAdmin(): void {
    this.router.navigate(['admin/dashboard']);
  }

  redirectClient(): void {
    this.router.navigate(['client/landing-page']);
  }

  retrievePass(): void {
    this.authService.retrievePass(this.emailRetrieve).subscribe(() => {
      this.notifyS.sucessRetreivePass();
      $('#login-modal').modal('hide');
    }, error => {
      if (error.status === 400) {
        this.errorMessage = 'Ingrese un correo válido';
      } else if (error.status === 500) {
        this.errorMessage = 'Error en el servidor, intente más tarde';
      }
    });
  }
}
