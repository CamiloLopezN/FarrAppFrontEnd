import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {ClientService} from '../../services/client.service';
import {ClientResponse} from '../../model/client';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  public client: ClientResponse;
  public isRemove: boolean;
  public faExclamationTriangle = faExclamationTriangle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientS: ClientService,
    private userS: UserService,
    private datePipe: DatePipe,
    private authS: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.clientS.getUser().subscribe(res => {
        // tslint:disable-next-line:radix
        this.client = {
          firstName: res.message.firstName,
          lastName: res.message.lastName,
          birthdate: new Date(res.message.birthdate),
          gender: res.message.gender
        };
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }

  changeView(): void {
    this.isRemove = !this.isRemove;
  }

  edit(): void {
    this.router.navigate(['client/edit']);
  }


  sendReqRemove(): void {
    this.userS.removeUser().subscribe(() => {
        this.authS.logoutSessionDesact();
      },
      () => {
        this.authS.logoutExpired();
      });
  }
}
