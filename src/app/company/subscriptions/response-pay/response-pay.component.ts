import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SubscriptionService} from '../../../services/subscription.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-response-pay',
  templateUrl: './response-pay.component.html',
  styleUrls: ['./response-pay.component.css']
})
export class ResponsePayComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private notifyS: NotificationService,
              private authS: AuthService, private subS: SubscriptionService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('buy') === 'on') {
      localStorage.setItem('buy', 'off');
      location.reload();
    } else {
      const ref = this.route.snapshot.queryParams.ref_payco;
      this.subS.paidMembership(ref).subscribe(() => {
        this.authS.isSubscribe.next(true);
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.notifyS.serverError();
          this.router.navigate(['company/subscription']);
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        } else if (error.status === 400) {
          this.notifyS.disapprovedSub();
          this.router.navigate(['company/subscription']);
        }
      }, () => {
        this.router.navigate(['company/subscription']);
      });
    }
  }

}
