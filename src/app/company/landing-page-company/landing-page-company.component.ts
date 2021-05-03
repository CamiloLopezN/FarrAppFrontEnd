import {Component, ElementRef, OnInit} from '@angular/core';
import {CompanyResponse, EventView} from '../../model/company';
import {CompanyService} from '../../services/company.service';
import {AuthService} from '../../services/auth.service';
import {faUser, faCalendarCheck, faBuilding, faMoneyCheckAlt, faCreditCard, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

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
  faMoneyCheck = faMoneyCheckAlt;
  faCreditCard = faCreditCard;
  faInfoCard = faInfoCircle;
  isSubscribe: boolean;
  eventsActive: EventView[];

  constructor(private elementRef: ElementRef, private companyS: CompanyService, private authS: AuthService) {
  }

  ngOnInit(): void {
    this.authS.subscribe.subscribe(sub => {
      this.isSubscribe = sub;
    });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.getCompany();
  }

  getCompany(): void {
    this.companyS.getCompany().subscribe((res) => {
        this.company = {
          contactNumber: res.message.contactNumber,
          companyName: res.message.companyName,
          nit: res.message.nit,
          address: res.message.address,
          _id: res.message._id,
          establishments: res.message.establishments,
          events: res.message.events,
          userId: res.message.userId
        };
        this.eventsActive = this.company.events.filter(ev => ev.status === 'Activo');
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }
}
