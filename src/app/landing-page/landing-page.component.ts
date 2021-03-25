import {Component, HostListener, OnInit} from '@angular/core';
import {EventC} from '../model/company';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  prevScrollpos = window.pageYOffset;
  events: EventC[];

  constructor() {
    this.events = [];
  }


  ngOnInit(): void {
  }


  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(): void {
    const currentScrollPos = window.pageYOffset;
    if (350 > currentScrollPos) {
      document.getElementById('carousel_id').style.opacity = '1';
    } else {
      document.getElementById('carousel_id').style.opacity = '0';
    }
    this.prevScrollpos = currentScrollPos;
  }

  scroll(target: HTMLDivElement): void {
    target.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}
