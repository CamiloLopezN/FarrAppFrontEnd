import {Component, ElementRef, OnInit} from '@angular/core';
import {CompanyResponse, EventC} from '../../model/company';
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

  constructor(private elementRef: ElementRef, private companyS: CompanyService, private authS: AuthService) {
    this.events = [{
      city: 'Tunja',
      date: new Date(),
      hourFin: '21:00',
      hourInit: '19:00',
      img: 'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg',
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
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.getCompany();
  }

  getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res;
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }

}
