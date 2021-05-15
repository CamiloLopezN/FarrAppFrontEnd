import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faChevronDown, faPlus, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {CodePromotional, Status, Ticket} from '../../../model/company';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.css']
})
export class TicketTypeComponent implements OnInit {
  ticket: Ticket;

  price: number;
  quantity: number;
  dateInit: string;
  dateHourInit: string;
  dateFin: string;
  dateHourFin: string;
  description: string;
  priceDoor: number;
  fastLine = false;
  statusStr: string;
  codePromotions: CodePromotional[];
  maxTicketNumber: number;
  minTicketNumber: number;
  ballotHolder: string;
  infoExtra: string;

  status: Status[];
  transNorm: Status[];
  isVisible: boolean;
  faPlus = faPlus;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  messageDate: string;
  messageStatus: string;
  messageBallotHolder: string;

  isScroll = false;

  @Output() public addTicket: EventEmitter<any> = new EventEmitter();
  nameTicket: string;

  constructor() {
    this.status = [
      {isSelect: false, name: 'En venta'},
      {isSelect: false, name: 'Terminada'},
      {isSelect: false, name: 'Agotada'},
      {isSelect: false, name: 'Oculta'},
    ];
    this.transNorm = [
      {isSelect: false, name: 'Transferibles'},
      {isSelect: false, name: 'Nominativas'}
    ];
    this.codePromotions = [];
    this.dateHourInit = '20:00';
    this.dateHourFin = '21:00';
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.ifValidate()) {
      this.ticket = {
        isTransferable: this.transNorm[0].isSelect,
        promotionalCodes: this.codePromotions,
        salesEnd: this.makeDate(this.dateFin, this.dateHourFin),
        salesStart: this.makeDate(this.dateInit, this.dateHourInit),
        description: this.description,
        isFastLine: this.fastLine,
        maxPerPurchase: this.maxTicketNumber,
        minPerPurchase: this.minTicketNumber,
        onlinePrice: this.price,
        onDoorPrice: this.priceDoor,
        totalAvailable: this.quantity,
        status: this.status.find(item => item.isSelect === true).name,
        ticketName: this.nameTicket
      };
      if (this.infoExtra?.trim()) {
        this.ticket.otherInfo = this.infoExtra;
      }
      this.addTicket.emit(this.ticket);
    }
  }

  makeDate(date, hour): Date {
    const splitInitDate = date.split('-').map(x => Number.parseInt(x, 10));
    const splitInitHour = hour.split(':').map(x => Number.parseInt(x, 10));
    return new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2], splitInitHour[0], splitInitHour[1], 0);
  }

  ifValidate(): boolean {
    this.messageDate = '';
    this.messageStatus = '';
    this.messageBallotHolder = '';
    if (!this.ifAfter()) {
      this.messageDate = 'La fecha inicial debe ser mayor a la actual';
      if (!this.isScroll) {
        const target = document.getElementById('dateInit');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifGreater()) {
      this.messageDate = 'La fecha inicial debe ser menor a la final';
      if (!this.isScroll) {
        const target = document.getElementById('dateInit');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifStatus()) {
      this.messageStatus = 'Debes seleccionar un estado';
      if (!this.isScroll) {
        const target = document.getElementById('status-ticket');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    if (!this.ifBallotHolder()) {
      this.messageBallotHolder = 'Debes seleccionar un titular de boleta';
      if (!this.isScroll) {
        const target = document.getElementById('ballot-holder');
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        this.isScroll = true;
      }
    }
    this.isScroll = false;
    return this.messageDate === '' && this.messageStatus === '' && this.messageBallotHolder === '';
  }

  ifStatus(): boolean {
    return this.status.find(item => item.isSelect === true) !== undefined;
  }

  ifBallotHolder(): boolean {
    return this.transNorm.find(item => item.isSelect === true) !== undefined;
  }

  ifValidateAll(): boolean {
    return this.ifValidateMaxLength() && this.ifValidateMaxMin() &&
      this.ifValidateMinLength() && this.ifValidateQuantityLength() && this.ifValidatePriceDoorLength() && this.ifValidatePriceLength();
  }

  ifValidatePriceLength(): boolean {
    return this.price >= 0;
  }

  ifValidateQuantityLength(): boolean {
    return this.quantity > 0;
  }

  ifValidatePriceDoorLength(): boolean {
    return this.priceDoor >= 0;
  }

  ifValidateMaxLength(): boolean {
    return this.maxTicketNumber > 0;
  }

  ifValidateMinLength(): boolean {
    return this.minTicketNumber > 0;
  }

  ifValidateMaxMin(): boolean {
    return this.maxTicketNumber > this.minTicketNumber;
  }

  ifGreater(): boolean {

    const splitInitDate = this.dateInit.split('-').map(x => Number.parseInt(x, 10));
    const splitInitHour = this.dateHourInit.split(':').map(x => Number.parseInt(x, 10));
    const dateInit = new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2], splitInitHour[0], splitInitHour[1], 0);

    const splitFinDate = this.dateFin.split('-').map(x => Number.parseInt(x, 10));
    const splitFinHour = this.dateHourFin.split(':').map(x => Number.parseInt(x, 10));
    const dateFin = new Date(splitFinDate[0], splitFinDate[1] - 1, splitFinDate[2], splitFinHour[0], splitFinHour[1], 0);
    return dateInit < dateFin;
  }

  ifAfter(): boolean {
    const splitInitDate = this.dateInit.split('-').map(x => Number.parseInt(x, 10));
    const splitInitHour = this.dateHourInit.split(':').map(x => Number.parseInt(x, 10));
    const dateInit = new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2], splitInitHour[0], splitInitHour[1], 0);
    const dateActual = new Date();
    return dateActual < dateInit;
  }

  removeCode(index: number): void {
    this.codePromotions.splice(index, 1);
  }

  addCode(code: CodePromotional): void {
    this.isVisible = false;
    this.codePromotions.push(code);
    document.getElementById('divPromotionals').scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }

  changeButton(state: Status, list: Status[], message: string): void {

    if (message === this.messageStatus) {
      this.messageStatus = '';
    } else {
      this.messageBallotHolder = '';
    }

    state.isSelect = true;
    if (state.isSelect) {
      document.getElementById(state.name).style.background = 'black';
      document.getElementById(state.name).style.color = 'white';
    } else {
      document.getElementById(state.name).style.background = '#fafafa';
      document.getElementById(state.name).style.color = '#c2c5c8';
    }
    for (const stat of list) {
      if (stat.name !== state.name) {
        stat.isSelect = false;
        document.getElementById(stat.name).style.background = '#fafafa';
        document.getElementById(stat.name).style.color = '#c2c5c8';
      }
    }
  }

}
