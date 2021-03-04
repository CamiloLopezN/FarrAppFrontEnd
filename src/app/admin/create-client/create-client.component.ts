import {Component, Directive, OnInit} from '@angular/core';
import {CreateClient} from '../../model/admin';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';
import {faLock, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/';
import {AdminService} from '../../services/admin.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  client: CreateClient;
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

  constructor(private router: Router, private adminService: AdminService, private notificationService: NotificationService) {

  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.client = {
      name: this.nameClient,
      lastname: this.lastName,
      birthdate: this.birthdate,
      gender: this.gender,
      e_mail: this.email
    };
    this.adminService.createClient(this.client).subscribe((res) => {
        this.router.navigate(['admin']);
        this.notificationService.succesCreateClient();
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
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
