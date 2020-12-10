import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client';
import {Router} from '@angular/router';

import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';
import {faLock, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
  client: Client;
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


  constructor(private router: Router) {
    this.client = new Client();
  }

  onSubmit(): void {
    this.client.nameC = this.nameClient;
    this.client.lastName = this.lastName;
    this.client.birthdate = this.birthdate;
    this.client.gender = this.gender;
    this.client.e_mail = this.email;
    this.client.password = this.password;
    this.client.passwordCon = this.passwordCon;
    console.log(this.client);
  }


  ngOnInit(): void {
  }

  redirect(): void {
    this.router.navigate(['']);
  }


  isEqual(): boolean {
    return this.password === this.passwordCon;
  }

  isExistEmail(): boolean {
    return this.email === 'cami@gmail.com';
  }


  isInvalid(): boolean {
    return !this.isEqual();
  }
}
