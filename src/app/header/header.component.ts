import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {faHome, faUserPlus, faUser, faSignOutAlt, faGlassCheers, faSignInAlt, faKey, faUsersCog} from '@fortawesome/free-solid-svg-icons/';
import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;
  rol: string;
  isAdmin: boolean;
  isClient: boolean;
  isCompany: boolean;

  faHome = faHome;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faGlassCheers = faGlassCheers;
  faKey = faKey;
  faUsersCog = faUsersCog;

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  constructor(private authService: AuthService, private clientS: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
    this.authService.roled.subscribe(rol => {
      this.rol = rol;
    });
  }

  logOut(): void {
    this.authService.logoutSession();
  }

  edit(): void {
    this.router.navigate(['client/edit']);
  }
}
