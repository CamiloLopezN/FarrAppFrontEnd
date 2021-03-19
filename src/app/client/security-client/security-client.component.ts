import {Component, OnInit} from '@angular/core';
import {faUserCircle, faLock, faExclamationTriangle, faUnlock} from '@fortawesome/free-solid-svg-icons/';
import {Router} from '@angular/router';
import {ClientAccount} from '../../model/client';
import {NotificationService} from '../../services/notification.service';
import {ClientService} from '../../services/client.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-security-client',
  templateUrl: './security-client.component.html',
  styleUrls: ['./security-client.component.css']
})
export class SecurityClientComponent implements OnInit {

  faUserCircle = faUserCircle;
  faLock = faLock;
  faExclamationTriangle = faExclamationTriangle;
  faUnlock = faUnlock;
  client: ClientAccount;
  // tslint:disable-next-line:variable-name
  e_mail = '';
  password = '';
  passWordConfirm = '';
  errorMessage: string;

  constructor(
    private router: Router,
    private notifyS: NotificationService,
    private clientService: ClientService,
    private authS: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.clientService.getUserSecurity().subscribe((res) => {
        this.e_mail = res.search.e_mail;
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }

  onSubmit(): void {
    this.client = {
      e_mail: this.e_mail,
      password: this.password
    };
    this.clientService.changePass(this.client).subscribe(() => {
        this.notifyS.succesChangePass();
        this.router.navigate(['/client/profile']);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  isValidAll(): boolean {
    return !this.isDifferentTo() && this.isValidPassLenght()
      && this.isEqual() && !this.contentSpaces()
      && this.contentDigits() && this.contentLower() && this.contentUpper();
  }

  isEqual(): boolean {
    return this.password === this.passWordConfirm;
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

}

