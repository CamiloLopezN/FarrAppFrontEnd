import {Component, OnInit} from '@angular/core';
import {faStar as fs, faUser, faStarHalfAlt, faEdit, faTrash, faMapMarkerAlt, faTshirt, faBan} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import {MyComment, Opinion} from '../../../model/opinion';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {getDateEventPerfil} from '../../../model/RelojTest';

@Component({
  selector: 'app-event-perfil',
  templateUrl: './event-perfil.component.html',
  styleUrls: ['./event-perfil.component.css']
})
export class EventPerfilComponent implements OnInit {

  faStartSolid = fs;
  faStart = faStar;
  faStartMedia = faStarHalfAlt;
  faGps = faMapMarkerAlt;
  faTshirt = faTshirt;
  faBan = faBan;
  faUser = faUser;
  faEdit = faEdit;
  faTrash = faTrash;
  production = false;
  comments: MyComment[];
  comments2: MyComment[];
  average: string;
  opinion: Opinion[];
  finishPage = 5;
  actualPage: number;
  rol: string;
  isMyEvent = true;
  show = false;
  event: any;
  photos: string[];

  constructor(private userS: UserService, private route: ActivatedRoute, private authService: AuthService) {
    this.actualPage = 1;
    this.photos = [];
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
    this.comments2 = [
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
    this.authService.roled.subscribe(rol => {
      this.rol = rol;
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  addComment(): void {
    this.comments2.push({
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
      });
  }

  onScroll(): void {
    if (this.actualPage < this.finishPage) {
      this.addComment();
      this.actualPage++;
    } else {
      console.log('No more lines. Finish page!');
    }
  }

  hide(target: HTMLElement): void {
    this.comments2.splice(3, this.comments2.length - 3);
    this.actualPage = 1;
    this.scroll(target);
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

  scroll(target: HTMLElement): void {
    target.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  private getUser(): void {
    this.route.params.forEach((params: Params) => {
      const id = params.id;
      this.userS.getEventById(id).subscribe(res => {
        this.event = res.event;
        this.photos = res.event.photos;
        console.log(this.event);
        this.event.startDate = new Date(this.event.startDate);
        this.event.endDate = new Date(this.event.endDate);
      });
    });
  }

  getDate(date: Date): string {
    return getDateEventPerfil(date);
  }


  isHidden(divHidden: HTMLDivElement | HTMLElement): boolean {
    const curOverf = divHidden.style.overflow;

    if (!curOverf || curOverf === 'visible') {
      divHidden.style.overflow = 'hidden';
    }

    const isOverflowing = divHidden.clientWidth < divHidden.scrollWidth
      || divHidden.clientHeight < divHidden.scrollHeight;

    divHidden.style.overflow = curOverf;


    return isOverflowing;
  }

  edit(): void {
  }

  remove(): void {

  }

  getCategories(): string {
    let myStr = '';
    this.event.category.forEach(category => {
      myStr += category.name + ' - ';
    });
    return myStr.slice(0, -2);
  }

}
