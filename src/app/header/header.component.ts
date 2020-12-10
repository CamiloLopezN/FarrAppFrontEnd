import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {faHome, faUserPlus, faUser, faSignOutAlt, faUserEdit} from '@fortawesome/free-solid-svg-icons/';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;
  faHome = faHome;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faUserEdit = faUserEdit;

  constructor(private authService: AuthService, private clientS: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  logOut(): void {
    this.authService.logoutSession();
  }

  viewProfile(): void {
    this.clientS.getUser().subscribe((res) => {
      this.router.navigate(['client/' + res.search._id]);
    }, () => {
      this.authService.logoutExpired();
    });
  }

  edit(): void {
    this.clientS.getUser().subscribe((res) => {
      this.router.navigate(['client/' + res.search._id + '/edit']);
    }, () => {
      this.authService.logoutExpired();
    });
  }
}
