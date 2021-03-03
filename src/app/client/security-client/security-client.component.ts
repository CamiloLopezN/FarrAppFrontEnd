import {Component, OnInit} from '@angular/core';
import {faUserCircle, faLock, faExclamationTriangle, faUnlock, faExclamationCircle} from '@fortawesome/free-solid-svg-icons/';
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
  faExclamation = faExclamationCircle;
  client: ClientAccount;
  // tslint:disable-next-line:variable-name
  e_mail = '';
  password = '';
  passWordConfirm = '';
  isPass = true;
  isUserMail = true;
  emailRetrieve: string;
  isUserEmailRetrieve = true;
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
    console.log(this.client);
    this.clientService.changePass(this.client).subscribe((res) => {
        this.router.navigate(['login']);
        this.notifyS.succesChangePass();
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  isEmpty(): boolean {
    return this.password === '';
  }

  isEmptyConfirm(): boolean {
    return this.passWordConfirm === '';
  }

  isEqual(): boolean {
    return this.password === this.passWordConfirm;
  }

  isDifferentTo(): boolean {
    return this.password === 'Passw0rd' || this.password === 'Password123';
  }

  isValidPassLenght(): boolean {
    return this.password?.length < 8;
  }

  contentSpaces(): boolean {
    if (/\s/.test(this.password?.toString())) {
      return true;
    } else {
      return false;
    }
  }

  contentUpper(): boolean {
    if (/[A-Z]/.test(this.password?.toString())) {
      return false;
    } else {
      return true;
    }
  }

  contentLower(): boolean {
    if (/[a-z]/.test(this.password?.toString())) {
      return false;
    } else {
      return true;
    }
  }

  contentDigits(): boolean {
    if (/^(?:\D*\d){2,100}\D*$/.test(this.password?.toString())) {
      return false;
    } else {
      return true;
    }
  }


}

