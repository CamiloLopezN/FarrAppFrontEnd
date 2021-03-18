import {Component, OnInit} from '@angular/core';
import {ClientResponse} from '../../model/client';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private clientS: ClientService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private ns: NotificationService
  ) {
    this.actualDate = new Date();
    this.btnOther = 'btnOther';
    this.btnMasc = 'btnMasc';
    this.btnFemale = 'btnFemale';
    this.client = {
      name: '',
      lastname: '',
      birthdate: '',
      gender: ''
    };
  }

  ngOnInit(): void {
    this.getUser();
  }

  initButtons(): void {
    if (this.client.gender == 'Mujer') {
      document.getElementById(this.btnFemale).style.color = '#ffffff';
      document.getElementById(this.btnFemale).style.backgroundColor = '#fa8499';
      document.getElementById(this.btnOther).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnOther).style.color = '#495057';
      document.getElementById(this.btnMasc).style.backgroundColor = '#d1d1d1';
      document.getElementById(this.btnMasc).style.color = '#495057';
    } else if (this.client.gender == 'Hombre') {
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
        const bdate = res.dateConverter.split('-');
        // tslint:disable-next-line:radix
        const date = new Date(Number.parseInt(bdate[2]), Number.parseInt(bdate[1]), Number.parseInt(bdate[0]));
        this.client = {
          name: res.search.name,
          lastname: res.search.lastname,
          birthdate: this.datePipe.transform(date, 'yyyy-MM-dd'),
          gender: res.search.gender
        };
        this.initButtons();
      },
      () => {
        this.authService.logoutExpired();
      }
    );
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }

  return(): void {
    this._router.navigate(['/client']);
  }

  save(): void {
    const vBirth = this.client.birthdate.split('-');
    this.client.birthdate = vBirth[2] + '-' + vBirth[1] + '-' + vBirth[0];
    this.clientS.editUser(this.client).subscribe(() => {
      this._router.navigate(['/client/profile']);
      this.ns.succesEditClient();
    }, () => {
      this.authService.logoutExpired();
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
    return this.client.name.length <= 150;
  }

  isLastNameLength(): boolean {
    return this.client.lastname.length <= 150;
  }

}
