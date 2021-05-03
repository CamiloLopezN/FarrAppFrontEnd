import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-response-pay',
  templateUrl: './response-pay.component.html',
  styleUrls: ['./response-pay.component.css']
})
export class ResponsePayComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authS: AuthService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('buy') === 'on') {
      localStorage.setItem('buy', 'off');
      location.reload();
    } else {
      this.authS.isSubscribe.next(false);
      this.router.navigate(['company/subscription']);
    }
  }

}
