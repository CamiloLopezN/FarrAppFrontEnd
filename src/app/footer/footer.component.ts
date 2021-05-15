import { Component, OnInit } from '@angular/core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  isLogged: boolean;

  constructor(public authService: AuthService, public router: Router) {
    this.authService.isLogged.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  ngOnInit(): void {
  }

}
