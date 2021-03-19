import { Component, OnInit } from '@angular/core';
import {ClientAccount} from '../../model/client';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {faUserCircle, faLock, faUnlock, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-security-admin',
  templateUrl: './security-admin.component.html',
  styleUrls: ['./security-admin.component.css']
})
export class SecurityAdminComponent implements OnInit {

  faUserCircle = faUserCircle;
  faLock = faLock;
  faExclamationTriangle = faExclamationTriangle;
  faUnlock = faUnlock;
  client: ClientAccount;
  e_mail = '';
  password = '';
  passWordConfirm = '';
  errorMessage: string;

  constructor(
    private router: Router,
    private notifyS: NotificationService,
    private adminService: AdminService,
    private authS: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.adminService.getAdminSecurity().subscribe((res) => {
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
    this.adminService.changePassAdmin(this.client).subscribe(() => {
        this.notifyS.succesChangePass();
        this.router.navigate(['/admin/profile']);
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
