import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {ClientResponseAdmin} from '../../model/client';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  client: ClientResponseAdmin;

  constructor(private _route: ActivatedRoute, private adminS: AdminService, private  authS: AuthService) {
    this.client = {
      _id: '',
      e_mail: '',
      name: '',
      lastname: '',
      birthdate: '',
      gender: ''
    };
  }

  ngOnInit(): void {
    this.getUser();
  }


  getUser() {
    this._route.params.forEach((params: Params) => {
      const id = params.id;
      this.adminS.getClients().subscribe(res => {
        for (const client of res) {
          if (id == client._id) {
            const birthDates = client.birthdate.split('-');
            this.client = {
              _id: client._id,
              e_mail: client.user.e_mail,
              name: client.name,
              lastname: client.lastname,
              birthdate: `${birthDates[0]}-${birthDates[1]}-${birthDates[2].substr(0, 2)}`,
              gender: client.gender
            };
          }
        }
      }, () => {
        this.authS.logoutExpired();
      });
    });
  }

}
