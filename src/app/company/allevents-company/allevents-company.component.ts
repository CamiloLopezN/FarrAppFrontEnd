import {Component, OnInit} from '@angular/core';
import {EventView} from '../../model/company';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import {IsShowModalService} from '../../services/is-show-modal.service';
import {CompanyService} from '../../services/company.service';
import {NotificationService} from '../../services/notification.service';

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

  constructor(private serviceShow: IsShowModalService, private compS: CompanyService, private ns: NotificationService) {
    this.eventsActive = [];
    this.eventsInactive = [];
    this.eventsPostpone = [];
    this.eventsFinish = [];
  }

  ngOnInit(): void {
  }

  event(): void {
    this.serviceShow.isEvent.next(true);
    this.compS.getEstablishment().subscribe(res => {
      if (res.establishments.length !== 0) {
        $('#register-event-modal').modal('show');
        this.serviceShow.isEstablishment.next(false);
      } else {
        this.serviceShow.isEvent.next(false);
        this.ns.warnNotEstablishment();
      }
    }, error => {
      console.log(error);
    });
  }
}
