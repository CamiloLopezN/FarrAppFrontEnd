import {Component, OnInit} from '@angular/core';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {RemoveItem} from '../../model/company';
import {EventEmmiterService} from '../../services/event-remove.service';

@Component({
  selector: 'app-remove-event-modal',
  templateUrl: './remove-event-modal.component.html',
  styleUrls: ['./remove-event-modal.component.css']
})
export class RemoveEventModalComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  removeItem: RemoveItem;

  constructor(private ers: EventEmmiterService) {
    this.removeItem = undefined;
    ers.event.subscribe(value => {
      this.removeItem = value;
    });
  }

  ngOnInit(): void {
  }

  removeCompany(): void {

  }
}
