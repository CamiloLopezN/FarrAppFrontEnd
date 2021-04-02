import {Component, HostListener, OnInit} from '@angular/core';
import {EventView} from '../model/company';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  prevScrollpos = window.pageYOffset;
  events: EventView[];

  constructor() {
    this.events = [
      {
        eventName : 'Paquita la del barrio',
        endDate: new Date(),
        startDate : new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      },
      {
        eventName : 'Paquita la del barrio',
        endDate: new Date(),
        startDate : new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      },
      {
        eventName : 'Paquita la del barrio',
        endDate: new Date(),
        startDate : new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      }
    ];
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
