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
  isActive: boolean;
  isReq: boolean;
  isAnimate = true;

  constructor(private ns: NotificationService, private route: ActivatedRoute, public loaderService: SpinnerService,
              private adminS: AdminService, private authS: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    const id = this.route.snapshot.params.id;
    this.adminS.getClientById(id).subscribe(res => {
        this.client = res;
      }, () => {
        this.authS.logoutExpired();
      }
    );
  }

  active(): void {
    this.adminS.changeStatus(true, false, true, this.client.userId._id).subscribe(() => {
      this.router.navigate(['/admin/client']);
      this.ns.succesActivateClient();
    }, error => {
      console.log(error);
      this.authS.logoutExpired();
    });
  }

  desactive(): void {
    this.adminS.changeStatus(false, false, false, this.client.userId._id).subscribe(() => {
      this.router.navigate(['/admin/client']);
      this.ns.sucessDesactivateClient();
    }, error => {
      console.log(error);
      this.authS.logoutExpired();
    });
  }
}
