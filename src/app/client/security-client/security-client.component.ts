import {Component, OnInit} from '@angular/core';
import {faUserCircle, faLock, faExclamationTriangle, faUnlock} from '@fortawesome/free-solid-svg-icons/';
import {Router} from '@angular/router';
import {ClientAccount} from '../../model/client';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {SpinnerService} from '../../services/spinner.service';

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
    private userService: UserService,
    private authS: AuthService,
    public loaderService: SpinnerService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser().subscribe((res) => {
        this.e_mail = res.email;
      },
      error => {
        if (error.status === 500 || error.status === 503) {
          this.notifyS.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }
    );
  }

  onSubmit(): void {
    this.client = {
      email: this.e_mail,
      password: this.password
    };
    this.userService.changePassword(this.client).subscribe(() => {
        this.notifyS.succesChangePass();
        this.router.navigate(['/client/profile']);
      },
      error => {
        if (error.status === 500 || error.status === 503) {
          this.notifyS.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
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

