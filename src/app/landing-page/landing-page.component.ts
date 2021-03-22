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
    this.events = [{
      city: 'Tunja',
      date: new Date(),
      hourFin: '21:00',
      hourInit: '19:00',
      img: 'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg',
      name: 'Fiesta fin de semestre'
    },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
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

}
