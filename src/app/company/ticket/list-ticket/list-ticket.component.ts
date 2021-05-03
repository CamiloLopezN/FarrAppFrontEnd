import {Component, Input, OnInit, Output} from '@angular/core';
import {Ticket} from '../../../model/company';

import {EventEmitter} from 'events';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();

  @Input() tickets: Ticket[];
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  isVisible = false;

  constructor() {
    this.tickets = [];
  }

  ngOnInit(): void {
  }

  removeTicket(index: number): void {
    this.tickets.splice(index, 1);
  }

  changeView(): void {
    this.isVisible = true;
  }

  addTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
    this.isVisible = false;
    document.getElementById('divTickets').scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }
}
