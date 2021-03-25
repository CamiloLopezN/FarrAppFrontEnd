import {Component, Input, OnInit} from '@angular/core';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {EventC} from '../../../model/company';
import {getDateEvent} from '../../../model/RelojTest';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  faClock = faClock;
  faMap = faMapMarkerAlt;

  @Input() event: EventC;

  constructor() {
    console.log(this.event);
  }

  ngOnInit(): void {
  }

  getDate(): string {
    const date = this.event.date.split('-').map(item => Number.parseInt(item, 10));
    return getDateEvent(new Date(date[0], date[1] - 1, date[2]));
  }

}
