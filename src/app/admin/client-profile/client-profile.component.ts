import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {ClientResponseAdmin2} from '../../model/client';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  client: ClientResponseAdmin2;
  user: any;
  isReq: boolean;

  constructor(private ns: NotificationService, private route: ActivatedRoute, public loaderService: SpinnerService,
              private adminS: AdminService, private authS: AuthService, private router: Router, private notifyS: NotificationService) {
  }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    const id = this.route.snapshot.params.id;
    this.adminS.getClientById(id).subscribe(res => {
        this.client = res;
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.notifyS.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }
    );
  }

  active(): void {
    this.adminS.changeStatus(true, false, true, this.client.userId._id).subscribe(() => {
      this.router.navigate(['/admin/client']);
      this.ns.succesActivateClient();
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }

  deactivate(): void {
    this.adminS.changeStatus(false, false, false, this.client.userId._id).subscribe(() => {
      this.router.navigate(['/admin/client']);
      this.ns.sucessDesactivateClient();
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.notifyS.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }
}
