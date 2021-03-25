import {Component, Input, OnInit} from '@angular/core';
import {faClock, faHeartBroken} from '@fortawesome/free-solid-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {EventView} from '../../../model/company';
import {getDateEvent} from '../../../model/RelojTest';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';

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

  @Input() event: EventView;
  isLike = false;
  isClient: string;

  constructor(private authService: AuthService, private ns: NotificationService) {
    this.authService.roled.subscribe(rol => {
      this.isClient = rol;
    });
  }

  ngOnInit(): void {
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

}
