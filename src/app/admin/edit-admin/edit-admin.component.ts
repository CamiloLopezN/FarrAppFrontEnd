import {Component, OnInit} from '@angular/core';
import {AdminResponse} from '../../model/admin';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  admin: AdminResponse;
  faIdCard = faIdCard;

  constructor(private adminS: AdminService, private authS: AuthService,
              public loaderService: SpinnerService,
              private router: Router, private ns: NotificationService) {
  }

  ngOnInit(): void {
    this.adminS.getAdminProfile().subscribe(res => {
      this.admin = {
        name: res.firstName,
        lastname: res.lastName
      };
    }, () => {
      this.authS.logoutExpired();
    });
  }

  save(): void {
    this.adminS.editAdmin(this.admin).subscribe(() => {
        this.router.navigate(['/admin/profile']);
        this.ns.succesEditAdmin();
      }, () => {
        this.authS.logoutExpired();
      }
    );
  }

  isNameLength(): boolean {
    return this.admin.name.length <= 150;
  }

  isLastNameLength(): boolean {
    return this.admin.lastname.length <= 150;
  }

  isValidAll(): boolean {
    return this.isNameLength() && this.isLastNameLength();
  }
}
