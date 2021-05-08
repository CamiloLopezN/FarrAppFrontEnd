import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AdminResponse} from '../../model/admin';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  admin: AdminResponse;

  constructor(private adminS: AdminService, private authS: AuthService, private notifyS: NotificationService) {
  }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin(): void {
    this.adminS.getAdminProfile().subscribe(res => {
      this.admin = {
        name: res.firstName,
        lastname: res.lastName
      };
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }
}
