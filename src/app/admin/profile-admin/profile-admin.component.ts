import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AdminResponse} from '../../model/admin';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  admin: AdminResponse;

  constructor(private adminS: AdminService, private authS: AuthService) {
  }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin(): void {
    this.adminS.getAdminProfile().subscribe(res => {
      console.log(res);
      this.admin = {
        name: res.firstName,
        lastname: res.lastName
      };
    }, () => {
      this.authS.logoutExpired();
    });
  }
}
