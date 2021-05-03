import {Component, OnInit} from '@angular/core';
import {EventView} from '../../../model/company';
import {ClientService} from '../../../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events-interests',
  templateUrl: './events-interests.component.html',
  styleUrls: ['./events-interests.component.css']
})
export class EventsInterestsComponent implements OnInit {


  events: EventView[];

  constructor(private clientS: ClientService, private router: Router) {
    this.events = [];
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.clientS.getUser().subscribe(res => {
      this.events = res.message.interests;
      if (this.events.length === 0) {
        this.router.navigate(['/client/landing-page']);
      }
    }, error => {
      console.log(error);
    });
  }

}
