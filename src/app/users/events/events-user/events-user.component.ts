import {Component, OnInit} from '@angular/core';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {EventView} from '../../../model/company';

declare var $: any;

@Component({
  selector: 'app-events-user',
  templateUrl: './events-user.component.html',
  styleUrls: ['./events-user.component.css']
})
export class EventsUserComponent implements OnInit {

  faSlider = faSlidersH;
  events: EventView[];

  constructor() {
    this.events = [
      {
        eventName: 'Paquita la del barrio',
        endDate: new Date(),
        startDate: new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      },
      {
        eventName: 'Paquita la del barrio',
        endDate: new Date(),
        startDate: new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      },
      {
        eventName: 'Paquita la del barrio',
        endDate: new Date(),
        startDate: new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      },
      {
        eventName: 'Paquita la del barrio',
        endDate: new Date(),
        startDate: new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      },
      {
        eventName: 'Paquita la del barrio',
        endDate: new Date(),
        startDate: new Date(),
        photos: ['https://cdn.pixabay.com/photo/2018/07/04/00/19/champagne-3515140_960_720.jpg'],
        _id: 'asdasdas',
        city: 'Tunja'
      }
    ];
  }


  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

}
