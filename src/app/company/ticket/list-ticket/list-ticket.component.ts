import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from '../../../model/company';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  tickets: Ticket[];

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
        status: 'Agotado'
      }];
  }

  ngOnInit(): void {
  }

}
