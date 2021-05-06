import {Component, Input, OnInit} from '@angular/core';
import {faClock, faEdit, faHeartBroken, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {EventView} from '../../../model/company';
import {getDateEvent} from '../../../model/RelojTest';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';
import {EventEmmiterService} from '../../../services/event-remove.service';
import {IsShowModalService} from '../../../services/is-show-modal.service';
import {ClientConnectService} from '../../../services/client-connect.service';
import {ClientsInterest} from '../../../model/client';
import {ClientService} from '../../../services/client.service';

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
  isLike: boolean;
  isClient: string;
  clientConnect: ClientsInterest;

  constructor(private authService: AuthService, private ns: NotificationService, public router: Router, private clientS: ClientService,
              private ers: EventEmmiterService, private ism: IsShowModalService, private clientC: ClientConnectService) {
    this.authService.roled.subscribe(rol => {
      this.isClient = rol;
    });
    this.clientC.client.subscribe(clientCon => {
      this.clientConnect = clientCon;
    });
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.ers.eventSelect.next({
      idEvent: this.event.eventId,
      idEstablishment: this.event.establishmentId,
      idCompany: this.event.companyId,
      name: this.event.eventName
    });
    this.ism.isEvent.next(true);
    this.event.start = new Date(this.event.start);
    this.event.end = new Date(this.event.end);
    if (this.isClient === 'client') {
      this.isLike = this.clientConnect.interests.find(ev => ev === this.event.eventId) !== undefined;
    } else if (this.isClient === 'norole') {
      this.isLike = false;
    }
  }

  getDate(): string {
    return getDateEvent(this.event.start);
  }

  like($event: MouseEvent): void {
    $event.stopPropagation();
    if (this.isClient !== 'norole') {
      this.clientS.like(this.event.eventId).subscribe(() => {
        if (!this.isLike) {
          this.clientConnect.interests.push(this.event.eventId);
          this.ns.succesFavorite(this.event.eventName);
        } else {
          const index = this.clientConnect.interests.indexOf(this.event.eventId, 0);
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

  redirect(): void {
    $(`#name${this.event.eventId}`).tooltip('hide');
    this.router.navigate(['company', this.event.companyId,
      'establishments', this.event.establishmentId,
      'events', this.event.eventId]);
  }

  edit($event: MouseEvent): void {
    $event.stopPropagation();
    try {
      this.ers.eventSelect.next({
        idEvent: this.event.eventId,
        idEstablishment: this.event.establishmentId,
        idCompany: this.event.companyId,
        name: this.event.eventName
      });
      this.ism.isEvent.next(true);
      this.ism.isEventEdit.next(true);
    } catch (error) {
      console.error(error);
    } finally {
      $('#register-event-modal').modal('show');
    }
  }

  remove(mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
    try {
      this.ers.eventSelect.next({
        idCompany: this.event.companyId,
        idEstablishment: this.event.establishmentId,
        idEvent: this.event.eventId,
        name: this.event.eventName
      });
    } catch (error) {
      console.error(error);
    } finally {
      $('#removeEvent').modal('show');
    }
  }

  hover($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
