import {Component, ElementRef, OnInit} from '@angular/core';
import {CompanyResponse, Establishment, EventC, EventView} from '../../model/company';
import {CompanyService} from '../../services/company.service';
import {AuthService} from '../../services/auth.service';
import {faUser, faCalendarCheck, faBuilding} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page-company',
  templateUrl: './landing-page-company.component.html',
  styleUrls: ['./landing-page-company.component.css']
})
export class LandingPageCompanyComponent implements OnInit {
  public company: CompanyResponse;
  faUser = faUser;
  faCalendar = faCalendarCheck;
  faBuilding = faBuilding;
  events: EventC[];
  eventss: EventView[];
  establishments: Establishment[];

  constructor(private elementRef: ElementRef, private companyS: CompanyService, private authS: AuthService) {
    this.eventss = [];
    this.events = [];

    this.establishments = [{
      address: 'Calle 11 N89 - 16',
      name: 'El Atico',
      img: 'https://cdn.pixabay.com/photo/2016/03/09/09/42/buildings-1245953_960_720.jpg'
    }, {
      address: 'Calle 11 N89 - 16',
      name: 'La cava',
      img: 'https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg'
    }, {
      address: 'Calle 11 N89 - 16',
      name: 'El infiernito',
      img: 'https://cdn.pixabay.com/photo/2016/03/09/09/42/buildings-1245953_960_720.jpg'
    }, {
      address: 'Calle 11 N89 - 16',
      name: 'El Yefri',
      img: 'https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg'
    }];
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.getCompany();
    this.getParcialEvents();
  }

  getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res.search;
        console.log(res);
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }

  private getParcialEvents(): void {
    this.companyS.getParcialEvents().subscribe(res => {
      res.events.forEach(event => {
        this.eventss.push({
          startDate: new Date(event.startDate),
          _id: event._id,
          eventName: event.eventName,
          city: event.city,
          endDate: new Date(event.endDate),
          photos: event.photos
        });
      });
      console.log(this.eventss);
    }, error => {
      console.log(error);
    });
  }
}
