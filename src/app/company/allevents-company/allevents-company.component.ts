import {Component, OnInit} from '@angular/core';
import {EventView} from '../../model/company';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import {IsShowModalService} from '../../services/is-show-modal.service';
import {CompanyService} from '../../services/company.service';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-allevents-company',
  templateUrl: './allevents-company.component.html',
  styleUrls: ['./allevents-company.component.css']
})
export class AlleventsCompanyComponent implements OnInit {

  eventsActive: EventView[];
  eventsInactive: EventView[];
  eventsPostpone: EventView[];
  eventsFinish: EventView[];
  faCalendarPlus = faCalendarPlus;
  interested: number;

  constructor(private serviceShow: IsShowModalService, private compS: CompanyService,
              private ns: NotificationService, private authS: AuthService) {
    this.eventsActive = [];
    this.eventsInactive = [];
    this.eventsPostpone = [];
    this.eventsFinish = [];
  }

  ngOnInit(): void {
    this.compS.getEvents().subscribe((res) => {
        const events = res.message.events;
        this.eventsActive = events.filter(ev => {
          return ev.status === 'Activo' && new Date(ev.end) >= new Date();
        });
        this.eventsInactive = events.filter(ev => ev.status === 'Inactivo');
        this.eventsPostpone = events.filter(ev => ev.status === 'Aplazado');
        this.eventsFinish = events.filter(ev => {
          return ev.status === 'Activo' && new Date(ev.end) < new Date();
        });

        this.interested = this.eventsActive.map(a => a.interested).reduce((a, b) => {
          return a + b;
        }, 0);

        this.interested += this.eventsFinish.map(a => a.interested).reduce((a, b) => {
          return a + b;
        }, 0);

      },
      error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }
    );
  }

  event(): void {
    this.serviceShow.isEvent.next(true);
    this.compS.getEstablishment().subscribe(res => {
      if (res.message.establishments.length !== 0) {
        $('#register-event-modal').modal('show');
        this.serviceShow.isEstablishment.next(false);
      } else {
        this.serviceShow.isEvent.next(false);
        this.ns.warnNotEstablishment();
      }
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }
}
