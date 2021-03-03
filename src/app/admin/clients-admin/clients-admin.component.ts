import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ClientResponseAdmin} from '../../model/client';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-clients-admin',
  templateUrl: './clients-admin.component.html',
  styleUrls: ['./clients-admin.component.css']
})
export class ClientsAdminComponent implements OnInit {

  clients: ClientResponseAdmin[];
  client: ClientResponseAdmin;
  faUser = faUser;
  p: Number = 1;

  constructor(private adminS: AdminService, private route: Router) {
    this.client = {
      _id: '',
      e_mail: '',
      name: '',
      lastname: '',
      birthdate: '',
      gender: ''
    };
    this.clients = [];
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.adminS.getClients().subscribe(res => {
      for (const client of res) {
        this.client = {
          _id: client._id,
          e_mail: client.user.e_mail,
          name: client.name,
          lastname: client.lastname,
          birthdate: client.birthdate,
          gender: client.gender
        };
        this.clients.push(this.client);
      }
    }, error => {
      console.log(error);
    });
  }

  profile(_id: string): void {
    this.route.navigate([`admin/client/${_id}`]);
  }
}
