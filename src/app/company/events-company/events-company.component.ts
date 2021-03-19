import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {EventC} from '../../model/company';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {getDateEvent} from '../../model/RelojTest';

declare const $: any;


@Component({
  selector: 'app-events-company',
  templateUrl: './events-company.component.html',
  styleUrls: ['./events-company.component.css']
})
export class EventsCompanyComponent implements OnInit {


  faClock = faClock;
  faMap = faMapMarkerAlt;
  @Input() events: EventC[];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    document.querySelectorAll('.carousel').forEach(() => {
      const $carousel = $('.carousel').flickity({
        imagesLoaded: true,
        percentPosition: false,
      });
      const $imgs = $carousel.find('.carousel-cell img');
// get transform property
      const docStyle = document.documentElement.style;
      const transformProp = typeof docStyle.transform == 'string' ?
        'transform' : 'WebkitTransform';
// get Flickity instance
      const flkty = $carousel.data('flickity');

      $carousel.on('scroll.flickity', () => {
        flkty.slides.forEach((slide, i) => {
          const img = $imgs[i];
          const x = (slide.target + flkty.x) * -1 / 3;
          img.style[transformProp] = 'translateX(' + x + 'px)';
        });
      });
    });

  }

  getDate(event: EventC): string {
    return getDateEvent(event.date);
  }


}
