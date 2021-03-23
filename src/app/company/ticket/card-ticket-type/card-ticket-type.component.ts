import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from '../../../model/company';

@Component({
  selector: 'app-card-ticket-type',
  templateUrl: './card-ticket-type.component.html',
  styleUrls: ['./card-ticket-type.component.css']
})
export class CardTicketTypeComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor() {
  }

  ngOnInit(): void {
  }

}
