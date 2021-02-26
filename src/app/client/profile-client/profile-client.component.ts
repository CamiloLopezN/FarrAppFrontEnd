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
    this.client = {
      id: '',
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
        this.client = {
          id: res.search._id,
          name: res.search.name,
          lastname: res.search.lastname,
          birthdate: this.datePipe.transform(res.search.birthdate, 'dd-MM-YYYY'),
          gender: res.search.gender
        };
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }

  removeUser(): void {
    this._router.navigate(['/login']);
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }

  edit(): void {
    this._router.navigate(['client/edit']);
  }
}
