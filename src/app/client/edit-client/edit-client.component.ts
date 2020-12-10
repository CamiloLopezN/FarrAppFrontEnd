import {Component, OnInit} from '@angular/core';
import {ClientResponse} from '../../model/client';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';

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
    private authService: AuthService
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
        birthdate: this.datePipe.transform(res.search.birthdate, 'yyyy-MM-dd'),
        gender: res.search.gender
      };
    });
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }

  return(): void {
    this._router.navigate(['/client/' + this.client.id]);
  }

  save(): void {
    const vBirth = this.client.birthdate.split('-');
    this.client.birthdate = vBirth[2] + '-' + vBirth[1] + '-' + vBirth[0];
    console.log(this.client.birthdate);
    this.clientS.editUser(this.client).subscribe(() => {
      this._router.navigate(['/client/' + this.client.id]);
    }, () => {
      this.authService.logoutExpired();
    });
  }
}
