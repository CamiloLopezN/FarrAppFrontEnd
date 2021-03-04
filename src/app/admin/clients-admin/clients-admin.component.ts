import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ClientResponseAdmin2} from '../../model/client';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-clients-admin',
  templateUrl: './clients-admin.component.html',
  styleUrls: ['./clients-admin.component.css']
})
export class ClientsAdminComponent implements OnInit {

  clients: ClientResponseAdmin2[];
  client: ClientResponseAdmin2;
  faUser = faUser;
  p: number;

  constructor(private adminS: AdminService, private route: Router, private authS: AuthService) {
    this.client = {
      _id: '',
      name: '',
      lastname: '',
    };
    this.clients = [];
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.adminS.getClients().subscribe(res => {
      this.clients = [];
      for (const client of res) {
        if (client.user.active && !client.user.req_desactive) {
          this.client = {
            _id: client._id,
            name: client.name,
            lastname: client.lastname,
          };
          this.clients.push(this.client);
        }
      }
    }, () => {
      this.authS.logoutExpired();
    });
  }

  profile(_id: string): void {
    this.route.navigate([`admin/client/${_id}`]);
  }

  getClientsD(): void {
    this.adminS.getClients().subscribe(res => {
      this.clients = [];
      for (const client of res) {
        if (!client.user.active && client.user.req_desactive) {
          this.client = {
            _id: client._id,
            name: client.name,
            lastname: client.lastname,
          };
          this.clients.push(this.client);
        }
      }
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getCompaniesPT(): void {
    this.adminS.getClients().subscribe(res => {
      this.clients = [];
      for (const client of res) {
        if (client.user.active && client.user.req_desactive) {
          this.client = {
            _id: client._id,
            name: client.name,
            lastname: client.lastname,
          };
          this.clients.push(this.client);
        }
      }
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getClientsP(): void {
    this.adminS.getClients().subscribe(res => {
      this.clients = [];
      for (const client of res) {
        if (!client.user.active && !client.user.req_desactive) {
          this.client = {
            _id: client._id,
            name: client.name,
            lastname: client.lastname,
          };
          this.clients.push(this.client);
        }
      }
    }, () => {
      this.authS.logoutExpired();
    });
  }
}
