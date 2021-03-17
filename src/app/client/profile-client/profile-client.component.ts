import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {ClientService} from '../../services/client.service';
import {ClientResponse} from '../../model/client';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  public client: ClientResponse;
  public isRemove: boolean;
  public faExclamationTriangle = faExclamationTriangle;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private clientS: ClientService,
    private datePipe: DatePipe,
    private authS: AuthService
  ) {
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
        this.authS.logoutExpired();
      }
    );
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }

  edit(): void {
    this._router.navigate(['client/edit']);
  }


  sendReqRemove(): void {
    this.clientS.removeUser().subscribe(() => {
        this.authS.logoutSessionDesact();
      },
      () => {
        this.authS.logoutExpired();
      });
  }
}
