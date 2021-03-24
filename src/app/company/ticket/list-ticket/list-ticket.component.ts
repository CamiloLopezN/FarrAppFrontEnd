import {Component, OnInit, Output} from '@angular/core';
import {Ticket} from '../../../model/company';

import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();

  tickets: Ticket[];
  faPlus = faPlus;

  constructor() {
    this.tickets = [{
      info: 'Acceso al recinto de concierto todos los días',
      name: ' Abono general',
      price: 61000,
      status: 'Agotado'
    },
      {
        info: 'Acceso al recinto de concierto todos los días',
        name: ' Abono general',
        price: 61000,
        status: 'Agotado'
      },
      {
        info: 'Acceso al recinto de concierto todos los días',
        name: ' Abono general',
        price: 61000,
        status: 'En venta'
      }];
  }

  ngOnInit(): void {
  }

  removeTicket(index: number): void {
    this.tickets.splice(index, 1);
  }

}
