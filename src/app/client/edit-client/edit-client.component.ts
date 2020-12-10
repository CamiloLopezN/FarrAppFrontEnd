import {Component, OnInit} from '@angular/core';
import {ClientResponse} from '../../model/client';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {DatePipe} from '@angular/common';

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
    private datePipe: DatePipe
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

    });
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }

  return(): void {
    this._router.navigate(['/client/' + this.client.id]);
  }

  edit(): void {

  }
}
