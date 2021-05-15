import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ClientResponseAdmin2} from '../../model/client';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

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

  constructor(private adminS: AdminService, private route: Router, private authS: AuthService, private notifyS: NotificationService) {
    this.itemsPerP = 6;
    this.clients = [];
  }

  ngOnInit(): void {
    this.getClients(true);
  }

  getClients(isChange: boolean): void {
    this.clientSelected = 'a';
    this.p = isChange ? 1 : this.p;
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, true).subscribe(res => {
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  profile(id: string): void {
    this.route.navigate([`admin/client/${id}`]);
  }

  getClientsD(isChange: boolean): void {
    this.clientSelected = 'd';
    this.p = isChange ? 1 : this.p;
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, false, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  getCompaniesPT(isChange: boolean): void {
    this.clientSelected = 'pt';
    this.p = isChange ? 1 : this.p;
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, true, true, true).subscribe(res => {
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  getClientsP(isChange: boolean): void {
    this.clientSelected = 'p';
    this.p = isChange ? 1 : this.p;
    this.adminS.getClients(this.p === undefined ? 1 : this.p, this.itemsPerP, true, false, false).subscribe(res => {
      this.total = res.totalDocs;
      this.clients = res.docs;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  pageChange($event: number): void {
    this.p = $event;
    if (this.clientSelected === 'a') {
      this.getClients(false);
    } else if (this.clientSelected === 'd') {
      this.getClientsD(false);
    } else if (this.clientSelected === 'p') {
      this.getClientsP(false);
    } else {
      this.getCompaniesPT(false);
    }

  }
}
