import {Component, Input, OnInit} from '@angular/core';
import {EventView} from '../../../model/company';
import {AuthService} from '../../../services/auth.service';
import {getDateEvent} from '../../../model/RelojTest';
import {faClock, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.css']
})
export class EventUserComponent implements OnInit {

  @Input() event: EventView;

  isLike = false;
  isClient: string;
  faClock = faClock;
  faMap = faMapMarkerAlt;

  constructor(private authService: AuthService) {
    this.authService.roled.subscribe(rol => {
      this.isClient = rol;
    });
  }

  ngOnInit(): void {
  }

  getDate(): string {
    return getDateEvent(this.event.startDate);
  }
}
