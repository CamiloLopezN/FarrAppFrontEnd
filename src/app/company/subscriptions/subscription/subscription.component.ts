import {Component, OnInit} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {Customer, Subscription, SubscriptionActual} from '../../../model/company';
import {Document} from '../../../model/document';
import {EpayService} from '../../../services/epay.service';
import {AuthService} from '../../../services/auth.service';
import {CreditCard, SendSubscribe} from '../../../model/creditCard';
import {SubscriptionService} from '../../../services/subscription.service';
import {ClientConnectService} from '../../../services/client-connect.service';
import {SpinnerService} from '../../../services/spinner.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  faCheckSolid = faCheck;
  subs: Subscription[];
  subSelect: Subscription;
  subResponse: Subscription;

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
              private subscriptionS: SubscriptionService, public loaderService: SpinnerService, private ns: NotificationService) {
    this.expirationDate = '';
    this.subs = [];
    this.cards = [];
    this.authS.subscribe.subscribe(sub2 => {
      this.isSubscribe = sub2;
      if (!this.isSubscribe) {
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
        }, error => {
          if (error.status === 500 || error.status === 503) {
            this.ns.serverError();
          } else if (error.status === 401 || error.status === 403) {
            this.authS.logoutExpiredAndReload();
          }
        }, () => {
          if (this.customerId !== undefined) {
            this.subscriptionS.getCustomer(this.customerId).subscribe(res => {
              this.cards = res.cards;
              this.cardSelect = this.cards.find(card => card.default === true);
            }, error => {
              if (error.status === 500 || error.status === 503) {
                this.ns.serverError();
              } else if (error.status === 401 || error.status === 403) {
                this.authS.logoutExpiredAndReload();
              }
            });
          }
        });
      } else {
        this.subscriptionS.getMembership().subscribe(res => {
          const sub: SubscriptionActual = res;
          this.subResponse = {
            intervalUnit: sub.interval,
            price: sub.price,
            planId: sub.orderReference,
            tax: sub.tax,
            taxBase: 0,
            intervalCount: sub.intervalCount,
            planName: sub.description,
            discount: 0,
            select: true,
            trialDays: 15
          };

          if (this.subResponse.intervalUnit === 'month') {
            this.subResponse.intervalUnit = 'Mes';
            if (this.subResponse.intervalCount !== 1) {
              this.subResponse.intervalUnit = 'Meses';
            }
          } else if (this.subResponse.intervalUnit === 'year') {
            this.subResponse.intervalUnit = 'Año';
          }
        }, () => {
        });
      }
    });

    this.authS.getCustomerId.subscribe(res => {
      this.customerId = res;
    });
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

    this.epayS.buyPlan(this.subSelect as Subscription);
  }

  createCustomer(customer: Customer): void {
    this.subscriptionS.createCustomer(customer).subscribe(res => {
      this.authS.customerId.next(res.customerId);
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    }, () => {
      this.authS.refreshToken().subscribe(() => {
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }, () => {
        this.subscriptionS.getCustomer(this.customerId).subscribe(res => {
          this.cards = res.cards;
          this.cardSelect = this.cards.find(card => card.default === true);
        }, error => {
          if (error.status === 500 || error.status === 503) {
            this.ns.serverError();
          } else if (error.status === 401 || error.status === 403) {
            this.authS.logoutExpiredAndReload();
          }
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
    this.subscriptionS.subscribePlan(this.subscription).subscribe(() => {
      this.authS.isSubscribe.next(false);
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });
  }
}
