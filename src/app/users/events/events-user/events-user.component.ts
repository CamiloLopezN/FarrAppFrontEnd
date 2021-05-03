import {Component, OnInit} from '@angular/core';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {EventView} from '../../../model/company';
import {UserService} from '../../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-events-user',
  templateUrl: './events-user.component.html',
  styleUrls: ['./events-user.component.css']
})
export class EventsUserComponent implements OnInit {

  faSlider = faSlidersH;
  events: EventView[];

  constructor(private userS: UserService) {
  }


  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.userS.getEvents().subscribe(res => {
      this.events = res[0].data.map(event => event.events);
      console.log(this.events);
      this.events.forEach(ev => {
        ev.start = new Date(ev.start);
        ev.end = new Date(ev.end);
      });
      console.log(this.events);
    }, error => {
      console.log(error);
    }, () => {
      $(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
    });
  }

}
