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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private clientS: ClientService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private ns: NotificationService
  ) {
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
    console.log(this.client);
    this.clientS.editUser(this.client).subscribe(() => {
      this._router.navigate(['/client/profile']);
      this.ns.succesEditClient();
    }, () => {
      this.authService.logoutExpired();
    });
  }
}
