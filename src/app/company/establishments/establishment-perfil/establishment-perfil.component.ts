import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {ActivatedRoute, Params} from '@angular/router';
import {EventView} from '../../../model/company';
import {faHeart, faStar as fs} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-establishment-perfil',
  templateUrl: './establishment-perfil.component.html',
  styleUrls: ['./establishment-perfil.component.css']
})
export class EstablishmentPerfilComponent implements OnInit {

  establishment: any;
  uncomingEvents: EventView[];
  terminatedEvents: EventView[];
  faHearth = faHeart;
  faStartSolid = fs;
  faStart = faStar;

  constructor(private compS: CompanyService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.uncomingEvents = [];
    this.terminatedEvents = [];
    this.getEstablishment();
  }

  getEstablishment(): void {
    this.route.params.forEach((params: Params) => {
      const id = params.id;
      this.compS.getEstablishmentById(id).subscribe(res => {
        this.establishment = res.establishment;
        console.log(res);
        res.upcomingEvents.forEach(event => {
          this.uncomingEvents.push({
            startDate: new Date(event.startDate),
            _id: event._id,
            eventName: event.eventName,
            city: event.city,
            endDate: new Date(event.endDate),
            photos: event.photos
          });
        });
        res.terminatedEvents.forEach(event => {
          this.terminatedEvents.push({
            startDate: new Date(event.startDate),
            _id: event._id,
            eventName: event.eventName,
            city: event.city,
            endDate: new Date(event.endDate),
            photos: event.photos
          });
        });
      }, error => {
        console.log(error);
      });
    });
  }

  getCategories(): string {
    let myStr = '';
    this.establishment.category.forEach(category => {
      myStr += category.name + ' - ';
    });
    return myStr.slice(0, -2);
  }

  getTypes(): string {
    let myStr = '';
    this.establishment.typeEst.forEach(typeEst => {
      myStr += typeEst.name + ' - ';
    });
    return myStr.slice(0, -2);
  }

}
