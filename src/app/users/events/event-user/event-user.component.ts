import {Component, Input, OnInit} from '@angular/core';
import {EventView} from '../../../model/company';
import {AuthService} from '../../../services/auth.service';
import {getDateEvent} from '../../../model/RelojTest';
import {faClock, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

declare var $: any;

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

  constructor(private authService: AuthService, private router: Router) {
    this.authService.roled.subscribe(rol => {
      this.isClient = rol;
    });
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  getDate(): string {
    return getDateEvent(new Date(this.event.start));
  }

  redirect(): void {
    $(`#title${this.event.eventId}`).tooltip('hide');
    this.router.navigate(['company', this.event.companyId,
      'establishments', this.event.establishmentId,
      'events', this.event.eventId]);
  }

  hover(mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
  }
}
