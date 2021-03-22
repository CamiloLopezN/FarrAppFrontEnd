import {Component, ElementRef, OnInit} from '@angular/core';
import {CompanyResponse, Establishment, EventC} from '../../model/company';
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
  establishments: Establishment[];

  constructor(private elementRef: ElementRef, private companyS: CompanyService, private authS: AuthService) {
    this.events = [{
      id: '0',
      city: 'Tunja',
      date: new Date(),
      hourFin: '21:00',
      hourInit: '19:00',
      img: 'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg',
      name: 'Fiesta fin de semestre'
    },
      {
        id: '1',
        city: 'Villa de leyva',
        date: new Date(),
        hourFin: '21:00',
        hourInit: '19:00',
        img: 'https://cdn.pixabay.com/photo/2015/09/02/13/04/marriage-918864_960_720.jpg',
        name: 'Saturday Night Party'
      }
    ];

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

}
