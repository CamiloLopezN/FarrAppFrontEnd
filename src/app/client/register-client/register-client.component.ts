import {Component, Directive, OnInit} from '@angular/core';
import {ClientRegistration} from '../../model/client';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';
import {faLock, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/';
import {ClientService} from '../../services/client.service';

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


  constructor(private router: Router, private clientService: ClientService) {
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
    this.clientService.register(this.client).subscribe((res) => {
        this.router.navigate(['login']);
      },
      error => {
        this.errorMessage = error.error.message;
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

  isDifferentTo(): boolean {
    return this.password === 'Passw0rd' || this.password === 'Password123';
  }

  isExistEmail(): boolean {
    return this.errorMessage === 'El correo electronico ingresado ya existe';
  }


  isInvalid(): boolean {
    return !this.isEqual();
  }

  isValidPassLenght(): boolean {
    return this.password?.length < 8;
  }


  isEmpty(): boolean {
    return this.password?.length === 0;
  }


  contentSpaces(): boolean {
    if (/\s/.test(this.password?.toString())){
      return true;
    } else {
      return  false;
    }
  }

  contentUpper(): boolean {
    if (/[A-Z]/.test(this.password?.toString())){
      return false;
    } else {
      return  true;
    }
  }

  contentLower(): boolean {
    if (/[a-z]/.test(this.password?.toString())){
      return false;
    } else {
      return  true;
    }
  }

  contentDigits(): boolean {
    if (/^(?:\D*\d){2,100}\D*$/.test(this.password?.toString())){
      return false;
    } else {
      return  true;
    }
  }


}
