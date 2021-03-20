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
    this.eventsActive = [{
      city: 'Tunja',
      date: new Date(),
      hourFin: '21:00',
      hourInit: '19:00',
      img: 'https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_960_720.jpg',
      name: 'Fiesta fin de semestre'
    },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      }
    ];
    this.eventsInactive = [{
      city: 'Tunja',
      date: new Date(),
      hourFin: '21:00',
      hourInit: '19:00',
      img: 'https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432_960_720.jpg',
      name: 'Fiesta fin de semestre'
    },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      }
    ];
    this.eventsPostpone = [{
      city: 'Tunja',
      date: new Date(),
      hourFin: '21:00',
      hourInit: '19:00',
      img: 'https://cdn.pixabay.com/photo/2015/05/15/14/48/fireworks-768706_960_720.jpg',
      name: 'Fiesta fin de semestre'
    },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      }
    ];
    this.eventsFinish = [{
      city: 'Tunja',
      date: new Date(),
      hourFin: '21:00',
      hourInit: '19:00',
      img: 'https://cdn.pixabay.com/photo/2016/11/23/13/45/blur-1852926_960_720.jpg',
      name: 'Fiesta fin de semestre'
    },
      {
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      }
    ];
  }

  ngOnInit(): void {
  }

}
