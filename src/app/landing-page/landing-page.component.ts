import {Component, HostListener, OnInit} from '@angular/core';
import {EstablishmentView, EventView} from '../model/company';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  prevScrollpos = window.pageYOffset;
  events: EventView[];
  establishments: EstablishmentView[];

  constructor(private userService: UserService) {
    this.events = [];
    this.establishments = [];
  }


  ngOnInit(): void {
    this.getEvents();
    this.getEstablishments();
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
    target.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }

  getEvents(): void {
    this.userService.getEvents().subscribe(res => {
      this.events = res[0].data.map(event => event.events);
      this.events.forEach(ev => {
        ev.start = new Date(ev.start);
        ev.end = new Date(ev.end);
      });
    }, error => {
      console.log(error);
    });
  }

  getEstablishments(): void {
    this.userService.getEstablishments().subscribe(res => {
      this.establishments = res[0].data.map(establishment => establishment.establishments);
    }, error => {
      console.log(error);
    });
  }
}
