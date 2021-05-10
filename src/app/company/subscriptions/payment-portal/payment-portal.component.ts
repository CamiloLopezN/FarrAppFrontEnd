import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faChevronRight, faPlus, faReceipt, faShoppingCart, faTimes} from '@fortawesome/free-solid-svg-icons';
import {SubscriptionService} from '../../../services/subscription.service';
import {CreditCard, SendCard} from '../../../model/creditCard';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {SubscriptionActual} from '../../../model/company';

@Component({
  selector: 'app-payment-portal',
  templateUrl: './payment-portal.component.html',
  styleUrls: ['./payment-portal.component.css']
})
export class PaymentPortalComponent implements OnInit {

  faShopping = faShoppingCart;
  faReceipt = faReceipt;
  faChevronRight = faChevronRight;
  faPlus = faPlus;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  showHistory = true;
  showListHistory = true;
  showPay = false;
  cards: CreditCard[];
  cardSelect: CreditCard;
  subscriptions: SubscriptionActual[];
  subS: SubscriptionActual;

  customerId: string;

  messageError: string;

  constructor(private subscriptionS: SubscriptionService, private ns: NotificationService,
              private authS: AuthService
  ) {
    this.authS.getCustomerId.subscribe(res => {
      this.customerId = res;
    });
    this.cards = [];
  }

  ngOnInit(): void {
    if (this.customerId !== undefined) {
      this.getUser();
    }
    this.getTransactions();
  }

  getUser(): void {
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

  changeView(subSelect?: SubscriptionActual): void {
    this.subS = subSelect;
    this.showHistory = !this.showHistory;
  }

  changeSelect(card: CreditCard): void {
    this.subscriptionS.changeDefaultCard({
      cardFranchise: card.franchise,
      cardMask: card.mask,
      cardToken: card.token
    }, this.customerId).subscribe(() => {
      this.cards.forEach(pm => pm.default = false);
      card.default = true;
      this.cardSelect = card;
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    });

  }

  getLast4(card: CreditCard): string {
    return card.mask.substring(this.cardSelect.mask.length - 4);
  }


  onClickRemove(event: MouseEvent, card: CreditCard): void {
    event.stopPropagation();
    if (this.cards.length !== 1) {
      this.subscriptionS.deleteCard(card, this.customerId).subscribe(() => {
        this.cards = this.cards.filter(item => item !== card);
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }, () => {
        if (card.default) {
          this.cards[0].default = true;
          this.changeSelect(this.cards[0]);
        }
      });
    }
  }

  addCard(card: SendCard): void {
    this.subscriptionS.addCard(card, this.customerId).subscribe(() => {
    }, error => {
      if (error.status === 500 || error.status === 503) {
        this.ns.serverError();
      } else if (error.status === 401 || error.status === 403) {
        this.authS.logoutExpiredAndReload();
      }
    }, () => {
      this.subscriptionS.getCustomer(this.customerId).subscribe(res => {
        this.cards.forEach(crd => crd.default = false);
        this.cards.push(res.cards.find(crd => crd.default === true));
      }, error => {
        if (error.status === 500 || error.status === 503) {
          this.ns.serverError();
        } else if (error.status === 401 || error.status === 403) {
          this.authS.logoutExpiredAndReload();
        }
      }, () => {
        this.showPay = !this.showPay;
      });
    });
  }

  getTransactions(): void {
    this.subscriptionS.getTransactions().subscribe(res => {
      this.subscriptions = res;
      this.subscriptions.sort((a, b) => {
        return a.periodStart > b.periodEnd ? 1 : -1;
      });
    }, error => {
      console.log(error);
    });
  }
}
