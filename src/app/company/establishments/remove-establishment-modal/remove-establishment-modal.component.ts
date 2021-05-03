import {Component, OnInit} from '@angular/core';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {RemoveEstablishment} from '../../../model/company';
import {EventEmmiterService} from '../../../services/event-remove.service';
import {CompanyService} from '../../../services/company.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-remove-establishment-modal',
  templateUrl: './remove-establishment-modal.component.html',
  styleUrls: ['./remove-establishment-modal.component.css']
})
export class RemoveEstablishmentModalComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  removeItem: RemoveEstablishment;

  constructor(private ers: EventEmmiterService, private companyService: CompanyService,
              private route: Router, private notifyS: NotificationService) {
    this.removeItem = undefined;
    ers.establishment.subscribe(value => {
      this.removeItem = value;
    });
  }

  ngOnInit(): void {
  }

  removeEstablishment(): void {
    this.companyService.removeEstablishment(this.removeItem.idEstablishment).subscribe(() => {
      this.route.navigate(['/company/landing-page']);
      this.notifyS.sucessRemoveEstablishment(this.removeItem.name);
    }, error => {
      console.log(error);
    });
  }
}
