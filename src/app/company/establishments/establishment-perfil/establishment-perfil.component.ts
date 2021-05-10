import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EstablishmentPerfil, EventView} from '../../../model/company';
import {faEdit, faHeart as fh, faStar as fs, faStarHalfAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faHeart, faStar} from '@fortawesome/free-regular-svg-icons';
import {EventEmmiterService} from '../../../services/event-remove.service';
import {NotificationService} from '../../../services/notification.service';
import {IsShowModalService} from '../../../services/is-show-modal.service';
import {AuthService} from '../../../services/auth.service';
import {MyComment, Opinion} from '../../../model/opinion';
import {UserService} from '../../../services/user.service';
import {ClientsInterest} from '../../../model/client';
import {ClientConnectService} from '../../../services/client-connect.service';
import {ClientService} from '../../../services/client.service';

declare var $: any;

@Component({
  selector: 'app-establishment-perfil',
  templateUrl: './establishment-perfil.component.html',
  styleUrls: ['./establishment-perfil.component.css']
})
export class EstablishmentPerfilComponent implements OnInit {

  establishment: EstablishmentPerfil;
  uncomingEvents: EventView[];
  terminatedEvents: EventView[];
  faStartSolid = fs;
  faStart = faStar;
  faStartMedia = faStarHalfAlt;
  faEdit = faEdit;
  faTrash = faTrash;

  faHeart = faHeart;
  faHeartSolid = fh;

  rol: string;

  accumulateComment = 0;

  ACCUMULATE = 3;

  comments: MyComment[];
  comments2: MyComment[];

  average: string;
  opinion: Opinion[];
  isFollow: boolean;

  isMine: boolean;

  isShow: boolean;

  clientConnect: ClientsInterest;

  constructor(private userS: UserService, private detectCh: ChangeDetectorRef,
              private clientS: ClientService,
              private route: ActivatedRoute, private ers: EventEmmiterService,
              private clientC: ClientConnectService,
              private ns: NotificationService, private ism: IsShowModalService, private authService: AuthService, private router: Router) {
    this.opinion = [];

    this.clientC.client.subscribe(clientCon => {
      this.clientConnect = clientCon;
    });

    this.authService.roled.subscribe(rol => {
      this.rol = rol;
    });
    this.isShow = false;
  }

  ngOnInit(): void {
    this.uncomingEvents = [];
    this.terminatedEvents = [];
    this.getEstablishment();

    $('#commentEventModal').on('hidden.bs.modal', () => {
      this.isShow = false;
    });

    this.authService.getRoleId.subscribe(rolId => {
      this.isMine = rolId === this.route.snapshot.params.idCompany;
    }).unsubscribe();
  }

  getEstablishment(): void {
    const idCompany = this.route.snapshot.params.idCompany;
    const idEstablishment = this.route.snapshot.params.id;
    this.userS.getEstablishmentById(idCompany, idEstablishment).subscribe(res => {
      this.establishment = res.message;
      this.uncomingEvents = this.establishment.events.filter(event => new Date(event.end) > new Date() &&
        ((event.status === 'Activo') || this.isMine));
      this.terminatedEvents = this.establishment.events.filter(event => new Date(event.end) <= new Date() &&
        ((event.status === 'Activo') || this.isMine));
      this.comments = res.message.reviews;
      this.comments.sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      });
      this.accumulateComment = this.comments.length >= this.ACCUMULATE ? this.ACCUMULATE : this.comments.length;
      this.average = res.message.averageRating.toFixed(1);
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authService.logoutExpiredAndReload();
      } else {
        this.router.navigate(['/landing-page']);
      }
    }, () => {
      this.refreshOpinions();
      if (this.rol === 'client') {
        this.isFollow = this.clientConnect.follows.find(ev => ev === this.establishment._id) !== undefined;
      }
      $(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
      this.ers.establishmentSelect.next({
        name: this.establishment.establishmentName,
        idEstablishment: this.establishment._id,
        idCompany: this.establishment.company.companyId
      });
    });
  }

  getCategories(): string {
    let myStr = '';
    this.establishment.categories.forEach(category => {
      myStr += category + ' - ';
    });
    return myStr.slice(0, -2);
  }

  getTypes(): string {
    let myStr = '';
    this.establishment.establishmentTypes.forEach(typeEst => {
      myStr += typeEst + ' - ';
    });
    return myStr.slice(0, -2);
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

  private getCoincidenceStar(nStart: number): number {
    return this.comments.filter(comment => comment.rating === nStart).length;
  }

  private getPercentege(nStart: number): string {
    return (this.getCoincidenceStar(nStart) * 100 / this.comments.length) + '%';
  }

  comment(): void {
    if (this.rol !== 'norole') {
      this.isShow = true;
      this.detectCh.detectChanges();
      $('#commentEventModal').modal('show');
    } else {
      this.authService.inLog.next(true);
      $('#login-modal').modal('show');
    }
  }

  scroll(target: HTMLElement): void {
    target.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  edit(): void {
    $(`#edit${this.establishment._id}`).tooltip('hide');
    try {
      this.ism.isEstablishment.next(true);
      this.ism.isEstablishmentEdit.next(true);
    } catch {

    }
  }

  remove(): void {
    $(`#delete${this.establishment._id}`).tooltip('hide');
    $('#removeEstablishment').modal('show');
  }

  follow(): void {
    if (this.rol !== 'norole') {
      this.clientS.follow(this.establishment._id).subscribe(() => {
        if (!this.isFollow) {
          this.clientConnect.follows.push(this.establishment._id);
          this.establishment.followers++;
          this.ns.succesFavorite(this.establishment.establishmentName);
        } else {
          this.establishment.followers--;
          const index = this.clientConnect.follows.indexOf(this.establishment._id, 0);
          if (index > -1) {
            this.clientConnect.follows.splice(index, 1);
          }
          this.ns.succesNotFavorite(this.establishment.establishmentName);
        }
        this.isFollow = !this.isFollow;
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authService.logoutExpiredAndReload();
        }
      });
    } else {
      this.authService.inLog.next(true);
      $('#login-modal').modal('show');
    }
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

  hide(target: HTMLElement): void {
    this.accumulateComment = this.comments.length >= this.ACCUMULATE ? this.ACCUMULATE : this.comments.length;
    target.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  onScroll(): void {
    this.accumulateComment = this.accumulateComment + this.ACCUMULATE >
    this.comments.length ? this.comments.length : this.accumulateComment + this.ACCUMULATE;
  }

  getList(): MyComment[] {
    return this.comments.slice(0, this.accumulateComment);
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
}
