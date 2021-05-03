import {Component, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {ClientService} from '../../../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-establishments-follows',
  templateUrl: './establishments-follows.component.html',
  styleUrls: ['./establishments-follows.component.css']
})
export class EstablishmentsFollowsComponent implements OnInit {

  establishments: EstablishmentView[];

  constructor(private clientS: ClientService, private router: Router) {
    this.establishments = [];
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.clientS.getUser().subscribe(res => {
      this.establishments = res.message.follows;
      if (this.establishments.length === 0) {
        this.router.navigate(['/client/landing-page']);
      }
    }, error => {
      console.log(error);
    });
  }

}
