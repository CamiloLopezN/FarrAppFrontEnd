import {ChangeDetectorRef, Component, HostListener, Input, OnInit} from '@angular/core';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {EventView} from '../../../model/company';
import {Router} from '@angular/router';

declare const $: any;


@Component({
  selector: 'app-events-company',
  templateUrl: './events-company.component.html',
  styleUrls: ['./events-company.component.css']
})
export class EventsCompanyComponent implements OnInit {


  @Input() events: EventView[];
  @Input() typeEvent: string;
  @Input() tittle: string;
  @Input() index: string;
  @Input() hasShowMore: boolean;

  faChevronRight = faChevronRight;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    this.onResize();
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  @HostListener('window:resize', [])
  private onResize(): void {
    this.cdr.detectChanges();
    if (screen.width <= 480) {
      document.querySelectorAll('.carousel' + this.index).forEach(() => {
        const $carousel = $('.carousel' + this.index).flickity({
          imagesLoaded: true,
          percentPosition: false,
          initialIndex: 1
        });
        const $imgs = $carousel.find('.carousel-cell' + this.index + ' img');
        if ($imgs.style !== undefined) {
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
        }
      });
    } else {
      document.querySelectorAll('.carousel' + this.index).forEach(() => {
        const $carousel = $('.carousel' + this.index).flickity({
          imagesLoaded: true,
          percentPosition: false,
          initialIndex: 1,
        });
        const $imgs = $carousel.find('.carousel-cell' + this.index + ' img');
        if ($imgs.style !== undefined) {
// get transform property
          const docStyle = document.documentElement.style;
          const transformProp = typeof docStyle.transform === 'string' ?
            'transform' : 'WebkitTransform';
// get Flickity instance
          const flkty = $carousel.data('flickity');

          $carousel.on('scroll.flickity', () => {
            flkty.slides.forEach((slide, i) => {
              const img = $imgs[i];
              const x = (slide.target + flkty.x) * -0.001;
              img.style[transformProp] = 'translateX(' + x + 'px)';
            });
          });
        }
      });
    }
  }

  redirect(): void {
    $('#showMore').tooltip('hide');
    this.router.navigate(['users/events']);
  }
}
