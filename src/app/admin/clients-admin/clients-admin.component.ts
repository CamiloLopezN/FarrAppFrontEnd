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
  faUser = faUser;
  p: number;
  total: number;
  itemsPerP: number;
  clientSelected: string;

  constructor(private adminS: AdminService, private route: Router, private authS: AuthService) {
    this.itemsPerP = 10;
    this.clients = [];
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientSelected = 'a';
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, true).subscribe(res => {
      console.log(res);
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  profile(id: string): void {
    this.route.navigate([`admin/client/${id}`]);
  }

  getClientsD(): void {
    this.clientSelected = 'd';
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, false, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getCompaniesPT(): void {
    this.clientSelected = 'pt';
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, true, true, true).subscribe(res => {
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  getClientsP(): void {
    this.clientSelected = 'p';
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, () => {
      this.authS.logoutExpired();
    });
  }

  pageChange($event: number): void {
    this.p = $event;
    if (this.clientSelected === 'a') {
      this.getClients();
    } else if (this.clientSelected === 'd') {
      this.getClientsD();
    } else if (this.clientSelected === 'p') {
      this.getClientsP();
    } else {
      this.getCompaniesPT();
    }

  }
}
