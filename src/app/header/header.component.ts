import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {
  faUserPlus,
  faUser,
  faSignInAlt,
  faKey,
  faUsersCog,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons/';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/';
import {CompanyService} from '../services/company.service';
import {NotificationService} from '../services/notification.service';
import {IsShowModalService} from '../services/is-show-modal.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  prevScrollPos = window.pageYOffset;
  isLogged: boolean;
  rol: string;
  name: string;

  faUserCircle = faUserCircle;
  faElipsis = faEllipsisV;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faSignInAlt = faSignInAlt;
  faKey = faKey;
  faUsersCog = faUsersCog;

  constructor(public authService: AuthService, private ns: NotificationService,
              private clientS: ClientService, private router: Router, private compS: CompanyService,
              public serviceShow: IsShowModalService
  ) {
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
    this.authService.roled.subscribe(rol => {
      this.rol = rol;
    });
    this.authService.getName.subscribe(name => {
      this.name = name;
    });
  }

  logOut(): void {
    this.authService.logoutSession();
  }

  edit(): void {
    this.router.navigate(['client/edit']);
  }


  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(): void {
    if (screen.width <= 1024) {
      const currentScrollPos = window.pageYOffset;
      if (this.prevScrollPos < currentScrollPos) {
        document.getElementById('navbar').style.top = '-350px';
      } else {
        document.getElementById('navbar').style.top = '0';
      }
      this.prevScrollPos = currentScrollPos;
    }
  }

  user(): void {
    if (this.rol === 'client') {
      this.router.navigate(['/client/profile']);
    } else if (this.rol === 'company') {
      this.router.navigate(['/company/profile']);
    } else if (this.rol === 'superAdmin') {
      this.router.navigate(['/admin/profile']);
    }
  }

  landingPage(): void {
    if (this.rol === 'client') {
      this.router.navigate(['/client/landing-page']);
    } else if (this.rol === 'company') {
      this.router.navigate(['/company/landing-page']);
    } else if (this.rol === 'superAdmin') {
      this.router.navigate(['/admin/landing-page']);
    }
  }

  event(): void {
    this.serviceShow.isEvent.next(true);
    this.compS.getEstablishment().subscribe(res => {
      if (res.establishments.length !== 0) {
        $('#register-event-modal').modal('show');
        this.serviceShow.isEstablishment.next(false);
      } else {
        this.serviceShow.isEvent.next(false);
        this.ns.warnNotEstablishment();
      }
    }, error => {
      console.log(error);
    });
  }

  event2(): void {
    this.serviceShow.isEstablishment.next(true);
    this.serviceShow.isEvent.next(false);
  }
}
