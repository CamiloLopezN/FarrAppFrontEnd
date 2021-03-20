import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {EventC} from '../../model/company';

declare const $: any;


@Component({
  selector: 'app-events-company',
  templateUrl: './events-company.component.html',
  styleUrls: ['./events-company.component.css']
})
export class EventsCompanyComponent implements OnInit {


  @Input() events: EventC[];
  @Input() typeEvent: string;
  @Input() tittle: string;
  @Input() index: string;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    document.querySelectorAll('.carousel' + this.index).forEach(() => {
      const $carousel = $('.carousel' + this.index).flickity({
        imagesLoaded: true,
        percentPosition: false
      });
      const $imgs = $carousel.find('.carousel-cell' + this.index + ' img');
// get transform property
      const docStyle = document.documentElement.style;
      const transformProp = typeof docStyle.transform === 'string' ?
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
}
