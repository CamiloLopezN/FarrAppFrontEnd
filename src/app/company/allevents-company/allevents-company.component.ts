import {Component, OnInit} from '@angular/core';
import {EventC} from '../../model/company';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-allevents-company',
  templateUrl: './allevents-company.component.html',
  styleUrls: ['./allevents-company.component.css']
})
export class AlleventsCompanyComponent implements OnInit {

  eventsActive: EventC[];
  eventsInactive: EventC[];
  eventsPostpone: EventC[];
  eventsFinish: EventC[];
  faCalendarPlus = faCalendarPlus;

  constructor() {
    this.eventsActive = [];
    this.eventsInactive = [];
    this.eventsPostpone = [];
    this.eventsFinish = [];
  }

  ngOnInit(): void {
  }

}
