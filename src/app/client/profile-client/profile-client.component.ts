import {Component, OnInit} from '@angular/core';
import {Client} from '../../../models/client';
import {ClientServiceService} from '../../services/client-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  public client: Client;
  public isRemove: boolean;
  public faExclamationTriangle = faExclamationTriangle;

  constructor(
    private _clientService: ClientServiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this._route.params.forEach((params: Params) => {
      const id = params.id;
      this._clientService.getUser(id).subscribe(
        response => {
          this.client = response;
        }, error => {
          console.log(error as any);
        }
      );
    });
  }

  removeUser(): void {
    this._clientService.removeUser(this.client.id);
    this._router.navigate(['/login']);
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }
}
