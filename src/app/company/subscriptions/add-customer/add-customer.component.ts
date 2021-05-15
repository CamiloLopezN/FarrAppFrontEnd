import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {Customer} from '../../../model/company';
import {SendCard} from '../../../model/creditCard';
import {SpinnerService} from '../../../services/spinner.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  faCheckSolid = faCheck;
  expirationDate: string;
  isSubscribe: boolean;
  isCustomer: boolean;
  cardNumber: string;
  customer: Customer;
  @Output() public next: EventEmitter<any> = new EventEmitter();
  @Output() public prev: EventEmitter<any> = new EventEmitter();
  @Input() isAdd: boolean;

  constructor(public loaderService: SpinnerService) {
    this.expirationDate = '';
    this.isCustomer = false;
    this.customer = {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      address: '',
      cellPhone: '',
      cardNumber: '',
      cardExpYear: '',
      cardExpMonth: '',
      cardCVC: '',
      isDefaultCard: true,
      companyId: ''
    };
  }

  ngOnInit(): void {
  }

  addCustomer(): void {
    try {
      const sExpiration = this.expirationDate.split('/');
      this.customer.cardExpMonth = sExpiration[0].replace(/\s/g, '');
      this.customer.cardNumber = this.cardNumber.replace(/\s/g, '');
      this.customer.cardExpYear = sExpiration[1].replace(/\s/g, '');
    } catch (e) {

    } finally {
      this.next.emit(this.customer);
    }

  }

  previous(): void {
    this.prev.emit();
  }

  addCard(): void {
    const sExpiration = this.expirationDate.split('/');
    const card: SendCard = {
      cardCVC: this.customer.cardCVC,
      cardExpMonth: sExpiration[0].replace(/\s/g, ''),
      cardNumber: this.cardNumber.replace(/\s/g, ''),
      cardExpYear: sExpiration[1].replace(/\s/g, '')
    };
    this.next.emit(card);
  }
}
