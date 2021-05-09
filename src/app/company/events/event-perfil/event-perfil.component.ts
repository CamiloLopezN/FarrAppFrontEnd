import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  faStar as fs,
  faUser,
  faStarHalfAlt,
  faEdit,
  faTrash,
  faMapMarkerAlt,
  faTshirt,
  faBan,
  faExclamationTriangle,
  faHeart as fh
} from '@fortawesome/free-solid-svg-icons';
import {faCalendarPlus, faCalendarTimes, faHeart, faStar} from '@fortawesome/free-regular-svg-icons';
import {MyComment, Opinion} from '../../../model/opinion';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {getDateEventPerfil} from '../../../model/RelojTest';
import {EventEmmiterService} from '../../../services/event-remove.service';
import {NotificationService} from '../../../services/notification.service';
import {IsShowModalService} from '../../../services/is-show-modal.service';
import {EventPerfil} from '../../../model/company';
import {CompanyService} from '../../../services/company.service';
import {ClientService} from '../../../services/client.service';
import {ClientConnectService} from '../../../services/client-connect.service';
import {ClientsInterest} from '../../../model/client';

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
  faGps = faMapMarkerAlt;
  faTshirt = faTshirt;
  faCalendarPlus = faCalendarPlus;
  faCalendarTimes = faCalendarTimes;
  faBan = faBan;
  faUser = faUser;
  faEdit = faEdit;
  faTrash = faTrash;
  faHeart = faHeart;
  faHeartSolid = fh;
  production = false;
  comments: MyComment[];
  average: string;
  opinion: Opinion[];
  actualPage: number;
  rol: string;
  show = false;
  event: EventPerfil;
  faExclamationTriangle = faExclamationTriangle;

  accumulateComment = 0;

  ACCUMULATE = 3;

  isLike = false;
  isPublish = false;
  isMine: boolean;
  clientConnect: ClientsInterest;

  isSubscribe: boolean;

  constructor(private userS: UserService, private route: ActivatedRoute, private router: Router,
              private clientC: ClientConnectService,
              private authService: AuthService, private ers: EventEmmiterService, private clientS: ClientService,
              private detectCh: ChangeDetectorRef,
              private ns: NotificationService, private ism: IsShowModalService, private companyS: CompanyService) {
    this.opinion = [];
    this.authService.roled.subscribe(rol => {
      this.rol = rol;
    });
    this.authService.subscribe.subscribe(sub => {
      this.isSubscribe = sub;
    });
    this.clientC.client.subscribe(clientCon => {
      this.clientConnect = clientCon;
    });
  }

  ngOnInit(): void {
    this.getEvent();
    this.authService.getRoleId.subscribe(rolId => {
      this.isMine = rolId === this.route.snapshot.params.idCompany;
    }).unsubscribe();
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
      total += comment.rating;
    });
    return total / this.comments.length;
  }

  getPercentege(nStart: number): string {
    return (this.getCoincidenceStar(nStart) * 100 / this.comments.length) + '%';
  }

  getCoincidenceStar(nStart: number): number {
    return this.comments.filter(comment => comment.rating === nStart).length;
  }

  scroll(target: HTMLElement): void {
    target.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  private getEvent(): void {

    const idCompany = this.route.snapshot.params.idCompany;
    const idEstablishment = this.route.snapshot.params.idEstablishment;
    const idEvent = this.route.snapshot.params.idEvent;
    this.userS.getEventById(idCompany, idEstablishment, idEvent).subscribe(res => {
      if (res.message.status === 'Inactivo' && !this.isMine) {
        this.router.navigate(['/landing-page']);
      } else {
        this.event = res.message;
        this.event.start = new Date(this.event.start);
        this.event.end = new Date(this.event.end);
      }
      this.comments = res.message.reviews;
      this.comments.sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      });
      this.accumulateComment = this.comments.length >= this.ACCUMULATE ? this.ACCUMULATE : this.comments.length;
      this.average = res.message.averageRating.toFixed(1);
    }, () => {
      this.router.navigate(['/landing-page']);
    }, () => {
      this.refreshOpinions();
      if (this.event !== undefined) {
        if (this.rol === 'client') {
          this.isLike = this.clientConnect.interests.find(ev => ev === this.event._id) !== undefined;
        }
        $(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
        this.ers.eventSelect.next({
          idEvent: this.route.snapshot.params.idEvent,
          idEstablishment: this.route.snapshot.params.idEstablishment,
          idCompany: this.route.snapshot.params.idCompany,
          name: this.event.eventName
        });
        this.ism.isEvent.next(true);
      }
    });
  }

  refreshOpinions(): void {
    this.opinion = [];
    for (let i = 5; i >= 1; i--) {
      this.opinion.push({
        coincidence: this.getCoincidenceStar(i),
        nStart: i,
        percentage: this.getPercentege(i)
      });
    }
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
    try {
      this.ism.isEvent.next(true);
      this.ism.isEventEdit.next(true);
    } catch {

    } finally {
      $('#register-event-modal').modal('show');
    }
  }

  remove(): void {
    $(`#remove${this.event._id}`).tooltip('hide');
    $('#removeEvent').modal('show');
  }

  comment(): void {
    if (this.rol !== 'norole') {
      $('#commentEventModal').modal('show');
    } else {
      this.authService.inLog.next(true);
      $('#login-modal').modal('show');
    }
  }

  getCategories(): string {
    let myStr = '';
    this.event.categories.forEach(category => {
      myStr += category + ' - ';
    });
    return myStr.slice(0, -2);
  }


  isAfter(): boolean {
    return this.event.end < new Date();
  }

  like(): void {
    if (this.rol !== 'norole') {
      this.clientS.like(this.event._id).subscribe(() => {
        if (!this.isLike) {
          this.clientConnect.interests.push(this.event._id);
          this.event.interested++;
          this.ns.succesFavorite(this.event.eventName);
        } else {
          this.event.interested--;
          const index = this.clientConnect.interests.indexOf(this.event._id, 0);
          if (index > -1) {
            this.clientConnect.interests.splice(index, 1);
          }
          this.ns.succesNotFavorite(this.event.eventName);
        }
        this.isLike = !this.isLike;
      });
    } else {
      this.authService.inLog.next(true);
      $('#login-modal').modal('show');
    }
  }


  inactive(): void {
    this.companyS.changeStatusEvent('Inactivo', this.route.snapshot.params.idEstablishment,
      this.route.snapshot.params.idEvent).subscribe(() => {
      this.event.status = 'Inactivo';
      this.ns.sucessHide(this.event.eventName);
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authService.logoutExpiredAndReload();
      }
    });
  }

  active(): void {
    if (this.isSubscribe) {
      this.companyS.changeStatusEvent('Activo', this.route.snapshot.params.idEstablishment,
        this.route.snapshot.params.idEvent).subscribe(() => {
        this.event.status = 'Activo';
        this.ns.sucessPublish(this.event.eventName);
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authService.logoutExpiredAndReload();
        }
      });
    } else {
      $('#warn-sub').modal('show');
    }
  }

  addComment(myRes: any): void {
    try {
      this.comments.unshift(myRes.comment);
      this.average = myRes.averageRating.toFixed(1);
      this.accumulateComment = this.comments.length <= this.ACCUMULATE ? this.comments.length : this.accumulateComment;
      this.refreshOpinions();
      this.detectCh.detectChanges();
    } catch (e) {

    } finally {
      $(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
      const target = document.getElementById(myRes.comment._id);
      target.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  getList(): MyComment[] {
    return this.comments.slice(0, this.accumulateComment);
  }

  hide(target: HTMLElement): void {
    this.accumulateComment = this.comments.length >= this.ACCUMULATE ? this.ACCUMULATE : this.comments.length;
    target.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  onScroll(): void {
    this.accumulateComment = this.accumulateComment + this.ACCUMULATE >
    this.comments.length ? this.comments.length : this.accumulateComment + this.ACCUMULATE;
  }
}
