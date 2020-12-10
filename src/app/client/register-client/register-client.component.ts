import {Component, OnInit} from '@angular/core';
import {ClientRegistration} from '../../model/client';
import {Router} from '@angular/router';

import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';
import {faLock, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/';
import {ClientServiceService} from '../../services/client-service.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
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


  constructor(private router: Router, private clientServiceService: ClientServiceService) {
  }

  onSubmit(): void {

    this.client = {
      name: this.nameClient,
      lastname: this.lastName,
      birthdate: this.birthdate,
      gender: this.gender,
      e_mail: this.email,
      password: this.password
    };
    this.clientServiceService.register(this.client).subscribe((res) => {
      this.router.navigate(['login']);
      },
      error => {
        this.errorMessage = error.error.message;
        console.log(error);
      }
    );


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
