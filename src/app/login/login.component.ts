import {Component, OnInit} from '@angular/core';
import {faUserCircle, faLock, faExclamationTriangle, faUnlock, faExclamationCircle} from '@fortawesome/free-solid-svg-icons/';
import {Router} from '@angular/router';
import {ClientLogin} from '../model/client';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUserCircle = faUserCircle;
  faLock = faLock;
  faExclamationTriangle = faExclamationTriangle;
  faUnlock = faUnlock;
  faExclamation = faExclamationCircle;
  client: ClientLogin;
  // tslint:disable-next-line:variable-name
  e_mail = '';
  password = '';
  isPass = true;
  isUserMail = true;
  emailRetrieve: string;
  isUserEmailRetrieve = true;

  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notifyS: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.client = {
      e_mail: this.e_mail,
      password: this.password
    };
    console.log(this.client);
    this.authService.login(this.client).subscribe(() => {
        this.isPass = true;
        this.isUserMail = true;
        this.notifyS.sucessLogin();
        this.redirect();
      },
      error => {
        this.errorMessage = error.error.message;
        if (error.error === 'Error la contraseña es incorrecta') {
          this.isUserMail = true;
          this.isPass = false;
        } else if (error.error === 'Error el correo ingresado no existe') {
          this.isUserMail = false;
          this.isPass = true;
        } else {
          this.isUserMail = true;
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

  isEmailExist(): boolean {
    return this.e_mail === 'josedaza@gmail.com';
  }


  isEmailExistTwo(): boolean {
    return this.emailRetrieve === 'josedaza@gmail.com';
  }

  redirect(): void {
    this.router.navigate(['']);

  }

  retrievePass(): void {
    this.isUserEmailRetrieve = this.isEmailExistTwo();
    console.log('Email enviado');
  }

  resetEmailRetrieve(): void {
    this.emailRetrieve = '';
  }
}
