import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faMinus, faPen} from '@fortawesome/free-solid-svg-icons';
import {Ticket} from '../../../model/company';

@Component({
  selector: 'app-card-ticket-type',
  templateUrl: './card-ticket-type.component.html',
  styleUrls: ['./card-ticket-type.component.css']
})
export class CardTicketTypeComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();
  @Input() ticket: Ticket;
  faPen = faPen;
  faMinus = faMinus;

  constructor() {
  }

  ngOnInit(): void {
  }

  disabled(): void {
    if (this.ticket.status === 'Agotado') {
      document.getElementById('div-ticket').style.background = '#fbfbfb';
    } else {
      document.getElementById('div-ticket').style.background = '#ffffff';
    }
  }

  deleted(): void {
    this.onDelete.emit();
  }
}
