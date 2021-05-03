import {Component, OnInit} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {Customer, Subscription} from '../../../model/company';
import {Document} from '../../../model/document';
import {EpayService} from '../../../services/epay.service';
import {AuthService} from '../../../services/auth.service';
import {CreditCard, SendSubscribe} from '../../../model/creditCard';
import {SubscriptionService} from '../../../services/subscription.service';
import {ClientConnectService} from '../../../services/client-connect.service';
import {SpinnerService} from '../../../services/spinner.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  faCheckSolid = faCheck;
  subs: Subscription[];
  subSelect: Subscription;

  subscription: SendSubscribe;

  documentSelect: Document;
  documentType: Document[];
  cardSelect: CreditCard;
  cards: CreditCard[];
  messageError = '';
  next = false;
  expirationDate: string;
  isSubscribe: boolean;
  documentStr = '';
  customerId: string;

  constructor(private epayS: EpayService, private authS: AuthService, private companyLogin: ClientConnectService,
              private subscriptionS: SubscriptionService, public loaderService: SpinnerService) {
    this.expirationDate = '';
    this.subs = [];
    this.cards = [];
    this.documentType = [{
      name: 'CÉDULA DE CIUDADANÍA',
      id: 'CC'
    }, {
      name: 'CÉDULA DE EXTRANJERÍA',
      id: 'CE'
    }, {
      name: 'PASAPORTE',
      id: 'PPN'
    }, {
      name: 'NÚMERO DE SEGURIDAD SOCIAL',
      id: 'SSN'
    }, {
      name: 'LICENCIA DE CONDUCCIÓN',
      id: 'LIC'
    }, {
      name: 'NÚMERO DE INDENTIFICACIÓN TRIBUTARIA',
      id: 'NIT'
    }, {
      name: 'TARJETA DE IDENTIDAD',
      id: 'TI'
    }, {
      name: 'DOCUMENTO NACIONAL DE IDENTIFICACIÓN',
      id: 'DNI'
    }
    ];
    this.documentSelect = this.documentType[0];
  }

  ngOnInit(): void {
    this.authS.subscribe.subscribe(sub => {
      this.isSubscribe = sub;
    });
    this.authS.getCustomerId.subscribe(res => {
      this.customerId = res;
    });
    this.subscriptionS.getPlans().subscribe(res => {
      this.subs = res;
      const min = Math.min(...this.subs.map(s => s.price));
      this.subs.forEach(sub => {
        if (sub.intervalUnit === 'month') {
          sub.discount = sub.price - (min * sub.intervalCount);
          sub.intervalUnit = 'Mes';
          if (sub.intervalCount !== 1) {
            sub.intervalUnit = 'Meses';
          }
        } else if (sub.intervalUnit === 'year') {
          sub.intervalUnit = 'Año';
          sub.discount = sub.price - (min * sub.intervalCount * 12);
        }
      });
      this.subs = this.subs.sort((a, b) => b.price - a.price);
      this.subs[0].select = true;
      this.subSelect = this.subs[0];
    }, (error) => {
      console.log(error);
    }, () => {
      if (this.customerId !== undefined) {
        this.subscriptionS.getCustomer(this.customerId).subscribe(res => {
          this.cards = res.cards;
          this.cardSelect = this.cards.find(card => card.default === true);
        }, error => {
          console.log(error);
        });
      }
    });
  }

  getLast4(card: CreditCard): string {
    return card.mask.substring(this.cardSelect.mask.length - 4);
  }

  changeBtns(sub: Subscription): void {
    sub.select = true;
    this.subSelect = sub;
    this.subs.forEach(sb => {
      if (sb !== sub) {
        sb.select = false;
      }
    });
  }

  payUnique(): void {

    this.epayS.buyPlan(this.subSelect);
  }

  createCustomer(customer: Customer): void {
    console.log(customer);
    this.subscriptionS.createCustomer(customer).subscribe(res => {
      this.authS.customerId.next(res.customerId);
    }, error => {
      console.log(error);
    }, () => {
      this.authS.refreshToken().subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      }, () => {
        this.subscriptionS.getCustomer(this.customerId).subscribe(res => {
          this.cards = res.cards;
          this.cardSelect = this.cards.find(card => card.default === true);
        }, error => {
          console.log(error);
        }, () => {
        });
      });
    });
  }

  subscribePlan(): void {
    this.subscription = {
      docNumber: this.documentStr,
      cardToken: this.cardSelect.token,
      customerId: this.customerId,
      docType: this.documentSelect.id,
      planId: this.subSelect.planId
    };
    this.subscriptionS.subscribePlan(this.subscription).subscribe(res => {
      console.log(res);
      this.authS.isSubscribe.next(false);
    }, error => {
      console.error(error);
    });
  }
}
