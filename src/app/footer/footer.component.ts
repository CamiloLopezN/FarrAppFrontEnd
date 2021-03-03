import { Component, OnInit } from '@angular/core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {Router} from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
