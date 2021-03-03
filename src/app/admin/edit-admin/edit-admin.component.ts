import {Component, OnInit} from '@angular/core';
import {AdminResponse} from '../../model/admin';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  admin: AdminResponse;

  constructor(private adminS: AdminService, private authS: AuthService, private _router: Router, private ns: NotificationService) {
    this.admin = {
      name: '',
      lastname: ''
    };
  }

  ngOnInit(): void {
    this.adminS.getAdminProfile().subscribe(res => {
      this.admin = {
        name : res.search.name,
        lastname : res.search.lastname
      };
    }, () => {
      this.authS.logoutExpired();
    });
  }

  save(): void {
    this.adminS.editAdmin(this.admin).subscribe(() => {
        this._router.navigate(['/admin/profile']);
        this.ns.succesEditAdmin();
      }, () => {
        this.authS.logoutExpired();
      }
    );
  }
}
