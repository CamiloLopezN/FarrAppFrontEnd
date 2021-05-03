import {Component, OnInit} from '@angular/core';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {EventEmmiterService} from '../../services/event-remove.service';
import {RemoveEvent} from '../../model/company';
import {CompanyService} from '../../services/company.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-remove-event-modal',
  templateUrl: './remove-event-modal.component.html',
  styleUrls: ['./remove-event-modal.component.css']
})
export class RemoveEventModalComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  removeItem: RemoveEvent;

  constructor(private ers: EventEmmiterService, private companyService: CompanyService,
              private route: Router, private notifyS: NotificationService) {
    this.removeItem = undefined;
    ers.event.subscribe(value => {
      this.removeItem = value;
    });
  }

  ngOnInit(): void {
  }

  removeCompany(): void {

    this.companyService.removeEvent(this.removeItem.idEstablishment, this.removeItem.idEvent).subscribe(() => {
      this.notifyS.sucessRemoveEvent(this.removeItem.name);
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.url !== '/company/landing-page') {
        this.route.navigate(['/company/landing-page']);
      } else {
        location.reload();
      }
    });
  }
}
