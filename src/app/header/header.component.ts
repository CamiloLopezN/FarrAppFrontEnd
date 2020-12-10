import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {faHome, faUserPlus, faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons/';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  logOut(): void {
    this.authService.logout();
  }

}
