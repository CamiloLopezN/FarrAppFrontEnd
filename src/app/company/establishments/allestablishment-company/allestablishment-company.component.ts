import {Component, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {IsShowModalService} from '../../../services/is-show-modal.service';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';
import {CompanyService} from '../../../services/company.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-allestablishment-company',
  templateUrl: './allestablishment-company.component.html',
  styleUrls: ['./allestablishment-company.component.css']
})
export class AllestablishmentCompanyComponent implements OnInit {

  establishments: EstablishmentView[];
  faCalendarPlus = faBuilding;

  constructor(private serviceShow: IsShowModalService, private companyS: CompanyService, private authS: AuthService) {
    this.establishments = [];
  }

  ngOnInit(): void {
    this.companyS.getEstablishment().subscribe((res) => {
        this.establishments = res.message.establishments;
      },
      () => {
        this.authS.logoutExpired();
      }
    );
  }

  establishment(): void {
    this.serviceShow.isEstablishment.next(true);
    this.serviceShow.isEvent.next(false);
  }

}
