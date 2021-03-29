import {Component, OnInit} from '@angular/core';
import {faStar as fs, faUser, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {faStar, faClock} from '@fortawesome/free-regular-svg-icons';
import {MyComment, Opinion} from '../../../model/opinion';

declare var $: any;

@Component({
  selector: 'app-event-perfil',
  templateUrl: './event-perfil.component.html',
  styleUrls: ['./event-perfil.component.css']
})
export class EventPerfilComponent implements OnInit {

  faStartSolid = fs;
  faStart = faStar;
  faStartMedia = faStarHalfAlt;
  faClock = faClock;
  faUser = faUser;
  production = true;
  comments: MyComment[];
  average: string;
  opinion: Opinion[];

  constructor() {
    this.comments = [
      {
        author: 'Juan funito',
        comment: 'Todo muy bonito pero el precio de los licores era supremamente alto, ' +
          'esto le resta bastantes puntos. Todo muy bonito pero el precio de los licores era supremamente alto, ' +
          'esto le resta bastantes puntos Todo muy bonito pero el precio de los licores era supremamente alto, ' +
          'esto le resta bastantes puntos',
        date: '22/03/2021',
        nStar: 4,
        title: 'Excelente discoteca, pero muy caro'
      },
      {
        author: 'Alfredo alcachofa',
        comment: 'Todo muy bonito pero el precio de los licores era supremamente alto, esto le resta bastantes puntos.',
        date: '22/03/2021',
        nStar: 5,
        title: '5 estrellas'
      },
      {
        author: 'Sofía rarini',
        comment: 'Todo muy bonito pero el precio de los licores era supremamente alto, esto le resta bastantes puntos.',
        date: '22/03/2021',
        nStar: 4,
        title: 'Un poco de todo'
      },
      {
        author: 'Sofía rarini',
        comment: 'Todo muy bonito pero el precio de los licores era supremamente alto, esto le resta bastantes puntos.',
        date: '22/03/2021',
        nStar: 4,
        title: 'Un poco de todo'
      },
      {
        author: 'Sofía rarini',
        comment: 'Todo muy bonito pero el precio de los licores era supremamente alto, esto le resta bastantes puntos.',
        date: '22/03/2021',
        nStar: 2,
        title: 'Un poco de todo'
      },
      {
        author: 'Sofía rarini',
        comment: 'Todo muy bonito pero el precio de los licores era supremamente alto, esto le resta bastantes puntos.',
        date: '22/03/2021',
        nStar: 3,
        title: 'Un poco de todo'
      }
    ];
    this.average = this.getPromedy().toFixed(1);
    this.opinion = [];
    for (let i = 5; i >= 1; i--) {
      this.opinion.push({
        coincidence: this.getCoincidenceStar(i),
        nStart: i,
        percentage: this.getPercentege(i)
      });
    }
  }

  ngOnInit(): void {

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

  getStars(nStar: any): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= nStar) {
        stars.push(true);
      } else {
        if (nStar % 1 !== 0 && Math.trunc(nStar) === i - 1) {
          stars.push(undefined);
        } else {
          stars.push(false);
        }
      }
    }
    return stars;
  }

  getPromedy(): number {

    let total = 0;
    this.comments.forEach(comment => {
      total += comment.nStar;
    });
    return total / this.comments.length;
  }

  getPercentege(nStart: number): string {
    return (this.getCoincidenceStar(nStart) * 100 / this.comments.length) + '%';
  }

  getCoincidenceStar(nStart: number): number {
    return this.comments.filter(comment => comment.nStar === nStart).length;
  }

}
