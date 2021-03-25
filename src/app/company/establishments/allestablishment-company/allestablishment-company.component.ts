import {Component, OnInit} from '@angular/core';
import {EstablishmentView} from '../../../model/company';
import {IsShowModalService} from '../../../services/is-show-modal.service';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-allestablishment-company',
  templateUrl: './allestablishment-company.component.html',
  styleUrls: ['./allestablishment-company.component.css']
})
export class AllestablishmentCompanyComponent implements OnInit {

  establishmentActive: EstablishmentView[];
  establishmentInactive: EstablishmentView[];
  faCalendarPlus = faBuilding;

  constructor(private serviceShow: IsShowModalService) {
    this.establishmentActive = [];
    this.establishmentInactive = [];
  }

  ngOnInit(): void {
  }

  establishment(): void {
    this.serviceShow.isEstablishment.next(true);
    this.serviceShow.isEvent.next(false);
  }

}
