import {Component, Input, OnInit} from '@angular/core';
import {faClock, faEdit, faHeartBroken, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {EventView} from '../../../model/company';
import {getDateEvent} from '../../../model/RelojTest';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';
import {EventRemoveService} from '../../../services/event-remove.service';

declare var $: any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  faClock = faClock;
  faMap = faMapMarkerAlt;
  faLike = faHeart;
  faDislike = faHeartBroken;
  faTrash = faTrash;
  faEdit = faEdit;

  @Input() event: EventView;
  isLike = false;
  isClient: string;

  constructor(private authService: AuthService, private ns: NotificationService, public router: Router, private ers: EventRemoveService) {
    this.authService.roled.subscribe(rol => {
      this.isClient = rol;
    });
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.ers.eventSelect.next({
      id: this.event._id,
      name: this.event.eventName
    });
  }

  getDate(): string {
    return getDateEvent(this.event.startDate);
  }

  like(): void {
    if (this.isClient !== 'norole') {
      if (!this.isLike) {
        document.getElementById('like' + this.event._id).style.color = 'red';
        this.ns.succesFavorite(this.event.eventName);
      } else {
        document.getElementById('like' + this.event._id).style.color = 'black';
        this.ns.succesNotFavorite(this.event.eventName);
      }
      this.isLike = !this.isLike;
    } else {
      this.authService.inLog.next(true);
      $('#login-modal').modal('show');
    }
  }

  getHour(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  redirect(): void {
    this.router.navigate(['/company/events/', this.event._id]);
  }

  edit(): void {

  }

  remove(): void {
    try {
      this.ers.eventSelect.next({
        id: this.event._id,
        name: this.event.eventName
      });
    } catch (error) {
      console.error(error);
    } finally {
      $('#removeEvent').modal('show');
    }
  }
}
