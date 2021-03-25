import {Component, ElementRef, OnInit} from '@angular/core';
import {CompanyResponse, EstablishmentView, EventC, EventView} from '../../model/company';
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
  establishments: EstablishmentView[];

  constructor(private elementRef: ElementRef, private companyS: CompanyService, private authS: AuthService) {
    this.eventss = [];
    this.establishments = [];

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.getCompany();
    this.getParcialEvents();
    this.getEstablishments();
  }

  getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = res.search;
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
    }, error => {
      console.log(error);
    });
  }

  private getEstablishments(): void {
    this.companyS.getParcialEstablishment().subscribe(res => {
      this.establishments = res;
    }, error => {
      console.log(error);
    });
  }
}
