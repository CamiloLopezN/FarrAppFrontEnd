  import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

  declare var $: any;

  @Component({
    selector: 'app-imgs-carousel',
    templateUrl: './imgs-carousel.component.html',
    styleUrls: ['./imgs-carousel.component.css']
  })
  export class ImgsCarouselComponent implements OnInit {

    @Input() photos: string[];

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
      this.cdr.detectChanges();
      const $carousel = $('.carousel').flickity({
        imagesLoaded: true,
        percentPosition: false,
        autoPlay: 2000,
        initialIndex: 1
      });

      const $imgs = $carousel.find('.carousel-cell img');
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

  }
