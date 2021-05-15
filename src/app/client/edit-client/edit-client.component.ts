import {Component, OnInit} from '@angular/core';
import {ClientResponse} from '../../model/client';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {SpinnerService} from '../../services/spinner.service';
import {faCalendarDay, faExclamationTriangle, faIdCard, faLock, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  public client: ClientResponse;
  public isRemove: boolean;
  private readonly actualDate: Date;
  btnOther: string;
  btnMasc: string;
  btnFemale: string;

  faLock = faLock;
  faUser = faUser;
  faCalendarDay = faCalendarDay;
  faIdCard = faIdCard;
  faExclamationTriangle = faExclamationTriangle;
  faUnlock = faUnlock;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientS: ClientService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private ns: NotificationService,
    public loaderService: SpinnerService
  ) {
    this.actualDate = new Date();
    this.btnOther = 'btnOther';
    this.btnMasc = 'btnMasc';
    this.btnFemale = 'btnFemale';
    this.client = {
      firstName: '',
      lastName: '',
      birthdate: new Date(),
      gender: ''
    };
  }

  ngOnInit(): void {
    this.getUser();
  }

  initButtons(): void {
    if (this.client.gender === 'Mujer') {
      document.getElementById(this.btnFemale).style.color = '#ffffff';
      document.getElementById(this.btnFemale).style.backgroundColor = '#fa8499';
      document.getElementById(this.btnOther).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnOther).style.color = '#495057';
      document.getElementById(this.btnMasc).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnMasc).style.color = '#495057';
    } else if (this.client.gender === 'Hombre') {
      document.getElementById(this.btnMasc).style.color = '#ffffff';
      document.getElementById(this.btnMasc).style.backgroundColor = '#9edcf6';
      document.getElementById(this.btnOther).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnOther).style.color = '#495057';
      document.getElementById(this.btnFemale).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnFemale).style.color = '#495057';
    } else {
      document.getElementById(this.btnOther).style.color = '#ffffff';
      document.getElementById(this.btnOther).style.backgroundColor = '#b6babd';
      document.getElementById(this.btnMasc).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnMasc).style.color = '#495057';
      document.getElementById(this.btnFemale).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnFemale).style.color = '#495057';
    }
  }

  getUser(): void {
    this.clientS.getUser().subscribe((res) => {
        const myDate = new Date(res.message.birthdate);
        this.client = {
          firstName: res.message.firstName,
          lastName: res.message.lastName,
          birthdate: this.datePipe.transform(`${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`, 'yyyy-MM-dd'),
          gender: res.message.gender
        };
        this.initButtons();
      },
      error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authService.logoutExpiredAndReload();
        }
      }
    );
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }

  return(): void {
    this.router.navigate(['/client']);
  }

  save(): void {
    this.clientS.editUser(this.client).subscribe(() => {
      this.router.navigate(['/client/profile']);
      this.ns.succesEditClient();
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authService.logoutExpiredAndReload();
      }
    });
  }

  ifBefore(): boolean {
    const birtDateD = new Date(this.client.birthdate);
    birtDateD.setDate(birtDateD.getDate() + 1);
    return birtDateD < this.actualDate;
  }

  changeButtoms(btnString: string): void {
    document.getElementById(btnString).style.color = '#ffffff';
    if (btnString === this.btnFemale) {
      this.client.gender = 'Mujer';
      document.getElementById(btnString).style.backgroundColor = '#fa8499';
      document.getElementById(this.btnOther).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnOther).style.color = '#495057';
      document.getElementById(this.btnMasc).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnMasc).style.color = '#495057';
    } else if (btnString === this.btnMasc) {
      this.client.gender = 'Hombre';
      document.getElementById(btnString).style.backgroundColor = '#9edcf6';
      document.getElementById(this.btnOther).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnOther).style.color = '#495057';
      document.getElementById(this.btnFemale).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnFemale).style.color = '#495057';
    } else {
      this.client.gender = 'Otro';
      document.getElementById(btnString).style.backgroundColor = '#b6babd';
      document.getElementById(this.btnMasc).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnMasc).style.color = '#495057';
      document.getElementById(this.btnFemale).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnFemale).style.color = '#495057';
    }
  }

  isNameLength(): boolean {
    return this.client.firstName.length <= 150;
  }

  isLastNameLength(): boolean {
    return this.client.lastName.length <= 150;
  }

  isValidAll(): boolean {
    return this.ifBefore() && this.isNameLength() && this.isLastNameLength() && this.client.gender !== '';
  }
}
