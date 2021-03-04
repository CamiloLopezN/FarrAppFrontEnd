import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {ClientResponseAdmin} from '../../model/client';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  client: ClientResponseAdmin;
  isActive: boolean;
  isReq: boolean;

  constructor(private ns: NotificationService, private _route: ActivatedRoute, private adminS: AdminService, private  authS: AuthService, private router: Router) {
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


  getUser(): void {
    this._route.params.forEach((params: Params) => {
      const id = params.id;
      this.adminS.getUserById(id).subscribe(res => {
          this.client = res.client[0];
          this.isActive = res.client[0].user.active;
          this.isReq = res.client[0].user.reqDesactive;
          this.client._id = res.client[0].id_user;
          this.client.e_mail = res.client[0].user.e_mail;
          const birthDates = this.client.birthdate.split('-');
          this.client.birthdate = `${birthDates[0]}-${birthDates[1]}-${birthDates[2].substr(0, 2)}`;
        },
        this.authS.logoutExpired);
    });
  }

  active(): void {
    this.adminS.activeCompany(this.client._id, true, false).subscribe(() => {
      this.router.navigate(['/admin/client']);
      this.ns.succesActivateClient();
    }, () => {
      this.authS.logoutExpired();
    });
  }

  desactive(): void {
    this.adminS.activeCompany(this.client._id, false, true).subscribe(() => {
      this.router.navigate(['/admin/client']);
      this.ns.sucessDesactivateClient();
    }, () => {
      this.authS.logoutExpired();
    });
  }
}
