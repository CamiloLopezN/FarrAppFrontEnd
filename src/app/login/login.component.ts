import {Component, OnInit} from '@angular/core';
import {faUserCircle, faLock, faExclamationTriangle, faUnlock, faExclamationCircle} from '@fortawesome/free-solid-svg-icons/';
import {Router} from '@angular/router';
import {Client, ClientLogin} from '../model/client';

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
  e_mail  = '';
  password = '';
  isPass = true;
  isUserMail = true;
  emailRetrieve: string;
  isUserEmailRetrieve = true;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.isEmailExist()) {
      this.isUserMail = false;
      this.isPass = true;
    } else if (!this.isPassOk()) {
      this.isUserMail = true;
      this.isPass = false;
    } else {
      this.isUserMail = true;
      this.isPass = true;
      this.redirect();
    }
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
