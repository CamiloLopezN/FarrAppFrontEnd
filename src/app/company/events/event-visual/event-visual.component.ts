import {Component, Input, OnInit} from '@angular/core';
import {faClock, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {EventC} from '../../../model/company';
import {getDateEvent} from '../../../model/RelojTest';

@Component({
  selector: 'app-event-visual',
  templateUrl: './event-visual.component.html',
  styleUrls: ['./event-visual.component.css']
})
export class EventVisualComponent implements OnInit {

  faClock = faClock;
  faMap = faMapMarkerAlt;

  @Input() event: EventC;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDate(): string {
    let date: number[];
    if (this.event.date != null) {
      date = this.event.date.split('-').map(item => Number.parseInt(item, 10));
    } else {
      return getDateEvent(new Date());
    }
    return getDateEvent(new Date(date[0], date[1] - 1, date[2]));
  }

}
